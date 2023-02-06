import { AmqpModule } from '@elikar/amqp'
import { LoggerModule } from '@elikar/logger'
import { ApplicationModule, Modules } from '@elikar/module'
import { MailerRpcSchema } from '@elikar/rpc-schemas'
import { RpcServerModule } from '@elikar/rpc-server'
import { App } from './App'

import { ConfigService } from './config'
import { MailerModule, MailerRpcController } from './mailer'
import { SendPulseModule } from './sendpulse'

export class AppModule extends ApplicationModule {
  constructor(private readonly config: ConfigService) {
    super()
  }

  init(): void {
    super.init()
    this.mainContainer.bind(App).toSelf().inSingletonScope()
  }

  modules(): Modules {
    return {
      import: () => [new LoggerModule().init(), new AmqpModule().init(this.config.get('amqp'))],
      local: () => [
        new SendPulseModule().init(this.config.get('sendpulse')),
        new MailerModule().init()
      ],
      rpc: () => [
        new RpcServerModule<MailerRpcSchema>().init({
          rpcSchema: this.get(MailerRpcController)
        })
      ]
    }
  }
}
