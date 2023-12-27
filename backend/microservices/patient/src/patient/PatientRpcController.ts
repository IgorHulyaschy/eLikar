import { rpcController } from '@elikar/application'
import { PatientDto } from '@elikar/dto'
import { PatientService } from './PatientService'

@rpcController('patient_rpc')
export class PatientRpcController {
  constructor(private readonly service: PatientService) {}

  getListOfPatients(dto: PatientDto.GetListOfPatients): Promise<PatientDto.Patient[]> {
    return this.service.getListOfPatients(dto)
  }

  get(id: string): Promise<PatientDto.Patient> {
    return this.service.get(id)
  }
}
