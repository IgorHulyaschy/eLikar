import { Module } from '@elikar/module'
import { MailerRpcController } from './MailerRpcController'
import { MailerService } from './MailerService'

export class MailerModule extends Module {
  register(): void {
    this.bind(MailerService).toSelf().inSingletonScope()
    this.bind(MailerRpcController).toSelf().inSingletonScope()
  }
}
