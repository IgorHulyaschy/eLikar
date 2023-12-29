import { MedicineDto } from '@elikar/dto'
import { RpcClient } from '@elikar/rpc-client'
import { MedicineRpcSchema } from '@elikar/rpc-schemas'
import { injectable } from 'inversify'

@injectable()
export class MedicineProxy {
  private readonly proxy: MedicineRpcSchema
  constructor(rpcClient: RpcClient) {
    this.proxy = rpcClient.getService(MedicineRpcSchema)
  }

  getAll(hospitalId: string): Promise<MedicineDto.Medicine[]> {
    return this.proxy.getAll(hospitalId)
  }
}
