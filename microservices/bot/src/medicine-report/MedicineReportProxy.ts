import { MedicineReportDto } from '@elikar/dto'
import { RpcClient } from '@elikar/rpc-client'
import { MedicineReportRpcSchema } from '@elikar/rpc-schemas'
import { injectable } from 'inversify'

@injectable()
export class MedicineReportProxy {
  private readonly proxy: MedicineReportRpcSchema
  constructor(rpcClient: RpcClient) {
    this.proxy = rpcClient.getService(MedicineReportRpcSchema)
  }

  getAll(dto: MedicineReportDto.GetMedicineReports): Promise<MedicineReportDto.MedicineReport[]> {
    return this.proxy.getAll(dto)
  }
}
