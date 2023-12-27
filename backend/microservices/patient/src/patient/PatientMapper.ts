import { PatientDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { Patient } from './Patient'

@injectable()
export class PatientMapper {
  toDto(p: Patient): PatientDto.Patient {
    return {
      id: p.id,
      fname: p.fname,
      lname: p.lname,
      diagnosis: p.diagnosis,
      isHealthy: p.isHealthy,
      hospitalId: p.hospitalId,
      phoneNumber: p.phoneNumber
    }
  }
}
