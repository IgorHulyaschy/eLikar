import { module } from '@elikar/module'

import { MailerProxy } from './MailerProxy'
import { MailerService } from './MailerService'

@module({
  deps: {
    services(local) {
      local.bind(MailerProxy).toSelf().inSingletonScope()
      local.bind(MailerService).toSelf().inSingletonScope()
    }
  }
})
export class MailerModule {}
