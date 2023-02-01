import { RpcClient } from '@elikar/rpc-client'
import { UserRpcSchema } from '@elikar/rpc-schemas'
import { injectable } from 'inversify'

@injectable()
export class UserProxy {
  private readonly proxy: UserRpcSchema
  constructor(rpcClient: RpcClient) {
    this.proxy = rpcClient.getService(UserRpcSchema)
  }

  async ping(): Promise<{ message: string }> {
    const res = await this.proxy.ping({ message: 'yeah' })
    console.log(res)
    return res
  }
}