import { NurseDto } from '@elikar/dto'
import { BcryptService } from '@elikar/bcrypt'

import { injectable } from 'inversify'
import { Nurse } from './Nurse'
import { NurseRepository } from './NurseRepository'
import { AlreadyExistsError } from './errors'

@injectable()
export class NurseService {
  constructor(
    private readonly repository: NurseRepository,
    private readonly bcrypt: BcryptService
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
}
