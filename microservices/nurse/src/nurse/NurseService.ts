import { NurseDto } from '@elikar/dto'
import { BcryptService } from '@elikar/bcrypt'

import { injectable } from 'inversify'
import { Nurse } from './Nurse'
import { NurseRepository } from './NurseRepository'
import { AlreadyExistsError } from './errors'
import { NurseMapper } from './NurseMapper'

@injectable()
export class NurseService {
  constructor(
    private readonly repository: NurseRepository,
    private readonly bcrypt: BcryptService,
    private readonly mapper: NurseMapper
  ) {}

  async create(dto: NurseDto.CreateNurse): Promise<void> {
    const passwordHash = await this.bcrypt.hash(dto.password)

    const nurse = Nurse.create({ ...dto, password: passwordHash })
    await this.repository.save(nurse)
  }

  async validateCreation(dto: NurseDto.CreateNurse): Promise<void> {
    const nurse = await this.repository.findOne({ email: dto.email })

    if (nurse) throw new AlreadyExistsError()

    return
  }

  async setTelegramConnection({
    email,
    id
  }: NurseDto.TelegramConnect): Promise<{ id: string; email: string } | null> {
    const nurse = await this.repository.findOne({ email })
    if (!nurse) return null

    nurse.setTgId(id)
    await this.repository.update(nurse)
    return {
      id,
      email
    }
  }

  async getByTgId(id: string): Promise<NurseDto.Nurse> {
    const nurse = await this.repository.findOne({ tgId: id })
    if (!nurse) throw new Error()

    return this.mapper.toDto(nurse)
  }
}
