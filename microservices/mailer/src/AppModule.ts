import { AmqpModule } from '@elikar/amqp'
import { LoggerModule } from '@elikar/logger'
import { module, IModule } from '@elikar/module'
import { RpcServerModule } from '@elikar/rpc-server'

import { App } from './App'
import { ConfigService } from './config'
import { MailerModule } from './mailer'
import { MailgunModule } from './mailgun'
import { SendPulseModule } from './sendpulse'

export const TYPES = {
  Options: Symbol('Options')
}

@module()
export class AppModule {
  static register(configService: ConfigService): IModule {
    return {
      imports: [
        LoggerModule,
        AmqpModule.register(configService.get('amqp')),
        RpcServerModule,
        SendPulseModule.register(configService.get('sendpulse')),
        MailgunModule.register(configService.get('mailgun')),
        MailerModule
      ],
      deps: {
        services(container) {
          container.bind(App).toSelf().inSingletonScope()
          container.bind(TYPES.Options).toConstantValue(configService.get('application'))
        }
      }
    }
  }
}
