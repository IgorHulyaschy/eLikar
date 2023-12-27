import { HospitalDto } from '@elikar/dto'
import { RpcClient } from '@elikar/rpc-client'
import { HospitalRpcSchema } from '@elikar/rpc-schemas'
import { injectable } from 'inversify'

@injectable()
export class HospitalProxy {
  private readonly proxy: HospitalRpcSchema
  constructor(rpcClient: RpcClient) {
    this.proxy = rpcClient.getService(HospitalRpcSchema)
  }

  get(id: string): Promise<HospitalDto.Hospital> {
    return this.proxy.get(id)
  }
}
