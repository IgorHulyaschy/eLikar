import { module } from '@elikar/module'
import { MailerRpcController } from './MailerRpcController'
import { MailerService } from './MailerService'

@module({
  deps: {
    services(local) {
      local.bind(MailerService).toSelf().inSingletonScope()
    },
    rpcControllers: [MailerRpcController]
  }
})
export class MailerModule {}
