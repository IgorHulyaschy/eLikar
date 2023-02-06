import { injectable } from 'inversify'
import { MailerRpcSchema } from '@elikar/rpc-schemas'
import { MailerDto } from '@elikar/dto'
import { MailerService } from './MailerService'

@injectable()
export class MailerRpcController implements MailerRpcSchema {
  queueName = 'mailer_rpc_schema'
  constructor(private readonly service: MailerService) {}

  send(data: MailerDto.SendMail): Promise<void> {
    return this.service.send(data)
  }
}
