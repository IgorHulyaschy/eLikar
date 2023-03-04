import { AmqpModule } from '@elikar/amqp'
import { MessageListenerModule } from '@elikar/message-listener'
import { IModule, module } from '@elikar/module'
import { TypeormModule } from '@elikar/typeorm'
import { BcryptModule } from '@elikar/bcrypt'
import { LoggerModule } from '@elikar/logger'

import { ConfigService } from './config'
import { App } from './App'
import { NurseModule } from './nurse'
import { RpcServerModule } from '@elikar/rpc-server'

export const TYPES = {
  Options: Symbol('options')
}

@module()
export class AppModule {
  static register(config: ConfigService): IModule {
    return {
      imports: [
        TypeormModule.register(config.get('typeorm')),
        AmqpModule.register(config.get('amqp')),
        MessageListenerModule,
        LoggerModule,
        RpcServerModule,
        BcryptModule.register(config.get('bcrypt')),
        NurseModule
        // new MessageClientModule().init()
      ],
      deps: {
        services(local) {
          local.bind(App).toSelf().inSingletonScope()
          local.bind(TYPES.Options).toConstantValue(config.get('application'))
        }
      }
    }
  }
}
