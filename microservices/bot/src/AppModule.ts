import { IModule, module } from '@elikar/module'
import { BotProviderModule } from '@elikar/bot-provider'

import { App } from './App'
import { BotModule } from './bot'
import { ConfigService } from './config'
import { LoggerModule } from '@elikar/logger'
import { MailerModule } from './mailer'
import { RpcClientModule } from '@elikar/rpc-client'
import { AmqpModule } from '@elikar/amqp'
import { RedisModule } from '@elikar/redis'

export const TYPES = {
  Options: 'Options'
}

@module()
export class AppModule {
  static register(config: ConfigService): IModule {
    return {
      imports: [
        AmqpModule.register(config.get('amqp')),
        BotProviderModule.register(config.get('bot')),
        RedisModule.register(config.get('redis')),
        BotModule,
        LoggerModule,
        MailerModule,
        RpcClientModule
      ],
      deps: {
        services(container) {
          container.bind(App).toSelf().inSingletonScope()
          container.bind(TYPES.Options).toConstantValue(config.get('application'))
        }
      }
    }
  }
}
