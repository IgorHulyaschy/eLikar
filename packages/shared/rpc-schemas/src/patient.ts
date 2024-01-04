import { MedicalHistoryDto, PatientDto } from '@elikar/dto'

export class PatientRpcSchema {
  queueName = 'patient_rpc'
  getListOfPatients!: (dto: PatientDto.GetListOfPatients) => Promise<PatientDto.Patient[]>
  get!: (id: string) => Promise<PatientDto.Patient>
  getMedicalHistory!: (patientId: string) => Promise<void>
  addToMedicalHistory!: (
    dto: MedicalHistoryDto.CreateMedicalHistory
  ) => Promise<MedicalHistoryDto.MedicalHistory[]>
}
