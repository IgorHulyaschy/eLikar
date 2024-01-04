import { rpcController } from '@elikar/application'
import { MedicalHistoryDto, PatientDto } from '@elikar/dto'
import { MedicalHistoryService } from '../medical-history/MedicalHistoryService'
import { PatientService } from './PatientService'

@rpcController('patient_rpc')
export class PatientRpcController {
  constructor(
    private readonly service: PatientService,
    private readonly mhService: MedicalHistoryService
  ) {}

  getListOfPatients(dto: PatientDto.GetListOfPatients): Promise<PatientDto.Patient[]> {
    return this.service.getListOfPatients(dto)
  }

  get(id: string): Promise<PatientDto.Patient> {
    return this.service.get(id)
  }

  getMedicalHistory(patientId: string): Promise<MedicalHistoryDto.MedicalHistory[]> {
    return this.mhService.getFullHistoryOfPatient(patientId)
  }

  addToMedicalHistory(dto: MedicalHistoryDto.CreateMedicalHistory): Promise<void> {
    return this.mhService.create(dto)
  }

  getByPhone(phone: string): Promise<PatientDto.Patient | null> {
    return this.service.getByPhone(phone)
  }
}
