import { HospitalDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { BcryptService } from '@elikar/bcrypt'

import { AlreadyExistsError } from './errors'
import { Hospital } from './Hospital'
import { HospitalRepository } from './HospitalRepository'

@injectable()
export class HospitalService {
  constructor(
    private readonly repository: HospitalRepository,
    private readonly bcrypt: BcryptService
  ) {}

  async create(data: HospitalDto.CreateHospital): Promise<void> {
    const passwordHash = await this.bcrypt.hash(data.password)

    const hospital = Hospital.create({ ...data, password: passwordHash })
    await this.repository.save(hospital)
  }

  async validateCreation({ email }: HospitalDto.CreateHospital): Promise<void> {
    const hospital = await this.repository.findOne({ email })
    if (hospital) throw new AlreadyExistsError()

    return
  }
}
