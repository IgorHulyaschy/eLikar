import { injectable } from 'inversify'
import Handlebars from 'handlebars'
import * as fs from 'fs'
import path from 'path'

import { MailerProxy } from './MailerProxy'

@injectable()
export class MailerService {
  template: HandlebarsTemplateDelegate
  constructor(private readonly proxy: MailerProxy) {
    this.template = Handlebars.compile(
      fs.readFileSync(path.resolve(__dirname, 'public', 'invitational-letter.hbs')).toString()
    )
  }

  async sendRegistrationLetters(emails: string[]): Promise<void> {
    for (const email of emails) {
      console.log(this.template({ link: `http://localhost:3000/api/nurse/form/${email}` }))
      await this.proxy.send({
        to: email,
        subject: 'Register',
        template: this.template({ link: `http://localhost:3000/api/nurse/form/${email}` })
      })
    }
  }
}
