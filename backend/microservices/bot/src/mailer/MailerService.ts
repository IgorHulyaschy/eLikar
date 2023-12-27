import { injectable } from 'inversify'
import Handlebars from 'handlebars'
import * as fs from 'fs'
import path from 'path'

import { MailerProxy } from './MailerProxy'

@injectable()
export class MailerService {
  private template: HandlebarsTemplateDelegate
  constructor(private readonly proxy: MailerProxy) {
    this.template = Handlebars.compile(
      fs.readFileSync(path.resolve(__dirname, 'public', 'confirmation-letter.hbs')).toString()
    )
  }

  sendConfirmationLetter(email: string, confirmationCode: string): Promise<void> {
    return this.proxy.send({
      to: email,
      subject: 'Telegram Connection',
      template: this.template({ confirmationCode })
    })
  }
}
