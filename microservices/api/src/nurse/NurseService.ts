import { injectable } from 'inversify'
import Handlebars from 'handlebars'
import * as fs from 'fs'
import path from 'path'
import { MessageClient } from '@elikar/message-client'
import { NurseCreateCommand } from '@elikar/commands'
import { NurseDto } from '@elikar/dto'
import { NurseProxy } from '../proxy'

@injectable()
export class NurseService {
  template: HandlebarsTemplateDelegate
  constructor(private readonly messageClient: MessageClient, private readonly proxy: NurseProxy) {
    this.template = Handlebars.compile(
      fs.readFileSync(path.resolve(__dirname, 'public', 'register-form.hbs')).toString()
    )
  }

  getRegisterForm(email: string, hospitalId: string): string {
    return this.template({ email, hospitalId })
  }

  async signUp(data: NurseDto.CreateNurse): Promise<void> {
    await this.proxy.validateCreation(data)
    return this.messageClient.emit(new NurseCreateCommand(data))
  }

  async signIn(data: NurseDto.SignIn): Promise<{ token: string }> {
    return this.proxy.signIn(data)
  }

  getList(): Promise<NurseDto.Nurse[]> {
    return this.proxy.getList()
  }
}
