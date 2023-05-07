import { PatientDto } from '@elikar/dto'

export class PatientRpcSchema {
  queueName = 'patient_rpc'
  getListOfPatients!: (dto: PatientDto.GetListOfPatients) => Promise<PatientDto.Patient[]>
}
