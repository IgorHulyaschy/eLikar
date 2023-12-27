import { injectable } from 'inversify'
import { RpcClient } from '@elikar/rpc-client'
import { MailerRpcSchema } from '@elikar/rpc-schemas'
import { MailerDto } from '@elikar/dto'

@injectable()
export class MailerProxy {
  private readonly proxy: MailerRpcSchema
  constructor(rpcClient: RpcClient) {
    this.proxy = rpcClient.getService(MailerRpcSchema)
  }

  send(data: MailerDto.SendMail): Promise<void> {
    return this.proxy.send(data)
  }
}
