import { HospitalDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { AlreadyExistsError } from './errors'
import { Hospital } from './Hospital'
import { HospitalRepository } from './HospitalRepository'

@injectable()
export class HospitalService {
  constructor(private readonly repository: HospitalRepository) {}

  async create(data: HospitalDto.CreateHospital): Promise<void> {
    const hospital = Hospital.create(data)
    await this.repository.save(hospital)
  }

  async validateCreation({ email }: HospitalDto.CreateHospital): Promise<void> {
    const hospital = await this.repository.findOne({ email })
    if (hospital) throw new AlreadyExistsError()

    return
  }
}
