import { injectable } from 'inversify'
import Handlebars from 'handlebars'
import * as fs from 'fs'
import path from 'path'

@injectable()
export class NurseService {
  template: HandlebarsTemplateDelegate
  constructor() {
    this.template = Handlebars.compile(
      fs.readFileSync(path.resolve(__dirname, 'public', 'register-form.hbs')).toString()
    )
  }

  getRegisterForm(email: string): string {
    return this.template({ email })
  }

  signIn(): any {}
}
