import { injectable } from 'inversify'
import { RedisService } from '@elikar/redis'
import { BotDto } from '@elikar/dto'

import { MailerService } from '../mailer'
import { CodeConfirmationError } from './errors'
import { StateKeys } from './constants'
import { Bot } from './Bot'
import { BotRepository } from './BotRepository'
import { HospitalProxy } from '../hospital'
import { NurseProxy } from '../nurse'

@injectable()
export class BotService {
  constructor(
    private readonly mailer: MailerService,
    private readonly redis: RedisService,
    private readonly repository: BotRepository,
    private readonly hospitalService: HospitalProxy,
    private readonly nurseService: NurseProxy
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
}
