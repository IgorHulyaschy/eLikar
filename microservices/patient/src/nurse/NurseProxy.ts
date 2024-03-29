import { NurseDto } from '@elikar/dto'
import { RpcClient } from '@elikar/rpc-client'
import { NurseRpcSchema } from '@elikar/rpc-schemas'
import { injectable } from 'inversify'

@injectable()
export class NurseProxy {
  private readonly proxy: NurseRpcSchema
  constructor(rpcClient: RpcClient) {
    this.proxy = rpcClient.getService(NurseRpcSchema)
  }

  getList(): Promise<NurseDto.Nurse[]> {
    return this.proxy.getList()
  }
}
