import { MailerDto } from '@elikar/dto'

export class MailerRpcSchema {
  queueName = 'mailer_rpc_schema'
  send!: (data: MailerDto.SendMail) => Promise<void>
}
