import { NurseDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { Nurse } from './Nurse'

@injectable()
export class NurseMapper {
  toDto(n: Nurse): NurseDto.Nurse {
    return {
      id: n.id,
      hospitalId: n.hospitalId,
      phoneNumber: n.phoneNumber,
      email: n.email,
      fname: n.fname,
      lname: n.lname,
      position: n.position,
      specialist: n.specialist
    }
  }
}
