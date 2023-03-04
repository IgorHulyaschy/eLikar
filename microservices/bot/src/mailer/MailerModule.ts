import { module } from '@elikar/module'
import { MailerProxy } from './MailerProxy'
import { MailerService } from './MailerService'

@module({
  deps: {
    services(container) {
      container.bind(MailerProxy).toSelf().inSingletonScope()
      container.bind(MailerService).toSelf().inSingletonScope()
    }
  }
})
export class MailerModule {}
