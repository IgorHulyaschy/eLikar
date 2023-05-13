import { injectable } from 'inversify'
import { RedisService } from '@elikar/redis'
import { BotDto, MedicineDto } from '@elikar/dto'

import { MailerService } from '../mailer'
import { CodeConfirmationError } from './errors'
import { StateKeys } from './constants'
import { Bot } from './Bot'
import { BotRepository } from './BotRepository'
import { HospitalProxy } from '../hospital'
import { NurseProxy } from '../nurse'
import { PatientProxy } from '../patient/PatientProxy'
import { BotTemplatesGenerator } from './BotTemplatesGenerator'
import { ReplyMarkUp } from './interfaces'
import { MedicineProxy } from '../medicine/MedicineProxy'
import { MessageClient } from '@elikar/message-client'
import { NurseMedicineReportCreateCommand } from '@elikar/commands'

@injectable()
export class BotService {
  constructor(
    private readonly mailer: MailerService,
    private readonly redis: RedisService,
    private readonly repository: BotRepository,
    private readonly hospitalService: HospitalProxy,
    private readonly nurseService: NurseProxy,
    private readonly patientService: PatientProxy,
    private readonly medicineService: MedicineProxy,
    private readonly botTemplatesGenerator: BotTemplatesGenerator,
    private readonly messageClient: MessageClient
  ) {}

  private generateConfirmationCode(): string {
    const resolve = []
    for (let i = 0; i < 6; i++) {
      const char = Math.floor(Math.random() * 9)
      resolve.push(char)
    }
    return resolve.join('')
  }

  async sendConfirmationLetter(email: string, keyOfUser: string): Promise<void> {
    const confirmationCode = this.generateConfirmationCode()
    await this.redis.set(`${StateKeys.CONFIRMATION_CODE}:${keyOfUser}`, { confirmationCode, email })

    return this.mailer.sendConfirmationLetter(email, confirmationCode)
  }

  async confirmConnection(code: string, keyOfUser: string): Promise<BotDto.Bot> {
    const data = await this.redis.get<{ confirmationCode: string; email: string }>(
      `${StateKeys.CONFIRMATION_CODE}:${keyOfUser}`
    )

    if (!data || data.confirmationCode !== code) throw new CodeConfirmationError()
    await this.redis.delete(`${StateKeys.CONFIRMATION_CODE}:${keyOfUser}`)

    return {
      id: keyOfUser,
      email: data.email
    }
  }

  async create(dto: BotDto.Bot): Promise<void> {
    const bot = Bot.create(dto)

    await this.repository.save(bot)
  }

  async getMe(id: string): Promise<BotDto.Account> {
    const nurse = await this.nurseService.get(id)
    const hospital = await this.hospitalService.get(nurse.hospitalId)

    return {
      ...hospital,
      ...nurse
    }
  }

  async getListOfPatients(
    {
      id,
      limit,
      offset
    }: {
      id: string
      limit: number
      offset: number
    },
    data: { forReport: boolean; medicineId?: string } | undefined
  ): Promise<ReplyMarkUp> {
    const nurse = await this.nurseService.get(id)
    const hospital = await this.hospitalService.get(nurse.hospitalId)

    if (data && data.forReport && data.medicineId) {
      const state = await this.redis.get<{ nurseId: string; medicineId: string }>(
        `${StateKeys.LIST_OF_MEDICINES}:${id}`
      )
      state!.medicineId = data.medicineId
      await this.redis.delete(`${StateKeys.LIST_OF_MEDICINES}:${id}`)
      await this.redis.set(`${StateKeys.LIST_OF_MEDICINES}:${id}`, state!)
    }
    const patients = await this.patientService.getListOfPatients({
      hospitalId: hospital.id,
      limit,
      offset
    })

    return this.botTemplatesGenerator.getListOfPatients(
      patients,
      { limit, offset },
      !!(data && data.forReport)
    )
  }

  async getListOfMedicines(id: string): Promise<MedicineDto.Medicine[]> {
    const nurse = await this.nurseService.get(id)
    const hospital = await this.hospitalService.get(nurse.hospitalId)

    await this.redis.set(`${StateKeys.LIST_OF_MEDICINES}:${id}`, { nurseId: nurse.id })
    return this.medicineService.getAll(hospital.id)
  }

  async createReport(dto: { patientId: string }, id: string): Promise<void> {
    const state = await this.redis.get<{ nurseId: string; medicineId: string }>(
      `${StateKeys.LIST_OF_MEDICINES}:${id}`
    )
    console.log(state)
    this.messageClient.emit(
      new NurseMedicineReportCreateCommand({
        medicineId: state!.medicineId,
        tgId: id,
        patientId: dto.patientId,
        count: 1
      })
    )

    await this.redis.delete(`${StateKeys.LIST_OF_MEDICINES}:${id}`)
  }
}
