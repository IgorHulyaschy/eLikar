import { MailerDto } from '@elikar/dto'
import { MailerService } from './MailerService'
import { rpcController } from '@elikar/application'

@rpcController('mailer_rpc_schema')
export class MailerRpcController {
  constructor(private readonly service: MailerService) {}

  send(data: MailerDto.SendMail): Promise<void> {
    return this.service.send(data)
  }
}
