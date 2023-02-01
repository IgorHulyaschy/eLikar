import { RpcClient } from '@elikar/rpc-client'
import { UserRpcSchema } from '@elikar/rpc-schemas'
import { injectable } from 'inversify'

@injectable()
export class UserProxy {
  private readonly proxy: UserRpcSchema
  constructor(rpcClient: RpcClient) {
    this.proxy = rpcClient.getService(UserRpcSchema)
  }

  ping(): Promise<{ message: string }> {
    return this.proxy.ping({ message: 'yeah' })
  }
}
