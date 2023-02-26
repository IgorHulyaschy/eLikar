import { MailerDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { MailgunService } from '../mailgun'
// import { SendPulseService } from '../sendpulse'

@injectable()
export class MailerService {
  constructor(private readonly sendpulseService: MailgunService) {}

  send(data: MailerDto.SendMail): Promise<void> {
    return this.sendpulseService.send(data)
  }
}
