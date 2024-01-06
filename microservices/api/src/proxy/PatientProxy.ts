import { PatientDto } from '@elikar/dto'
import { RpcClient } from '@elikar/rpc-client'
import { PatientRpcSchema } from '@elikar/rpc-schemas'
import { injectable } from 'inversify'

@injectable()
export class PatientProxy {
  private readonly proxy: PatientRpcSchema
  constructor(rpcClient: RpcClient) {
    this.proxy = rpcClient.getService(PatientRpcSchema)
  }

  async get(id: string): Promise<PatientDto.Patient> {
    return this.proxy.get(id)
  }

  getMedicalHistory(patientId: string): Promise<void> {
    return this.proxy.getMedicalHistory(patientId)
  }

  getByPhone(phone: string): Promise<PatientDto.Patient | null> {
    return this.proxy.getByPhone(phone)
  }

  getNurseDiagnosisHistory(nurseId: string): Promise<any> {
    return this.proxy.getNurseDiagnosisHistory(nurseId)
  }
}
