import { inject, injectable } from 'inversify'
import Mailgun from 'mailgun.js'
import formData from 'form-data'
import Client from 'mailgun.js/client'
import { MailerDto } from '@elikar/dto'

import { TYPES } from './constants'
import { Options } from './interfaces'

@injectable()
export class MailgunService {
  private readonly mailgun: Client
  private readonly domain: string
  constructor(@inject(TYPES.Options) { apiKey, domain }: Options) {
    this.mailgun = new Mailgun(formData).client({ username: 'api', key: apiKey })
    this.domain = domain
  }

  async send({ to, subject, template }: MailerDto.SendMail): Promise<void> {
    await this.mailgun.messages.create(this.domain, {
      to,
      from: 'gulyaschy@gmail.com',
      subject,
      html: template
    })
  }
}
