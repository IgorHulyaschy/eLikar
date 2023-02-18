import { HospitalDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { Hospital } from './Hospital'

@injectable()
export class HospitalMapper {
  toDto(admin: Hospital): HospitalDto.Hospital {
    return {
      id: admin.id,
      name: admin.name,
      address: admin.address,
      email: admin.email
    }
  }
}
