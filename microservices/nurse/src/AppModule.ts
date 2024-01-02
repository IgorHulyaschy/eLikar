import { AmqpModule } from '@elikar/amqp'
import { MessageListenerModule } from '@elikar/message-listener'
import { ApplicationBuilderModule } from '@elikar/application'
import { MessageClientModule } from '@elikar/message-client'
import { RpcServerModule } from '@elikar/rpc-server'
import { IModule, module } from '@elikar/module'
import { TypeormModule } from '@elikar/typeorm'
import { BcryptModule } from '@elikar/bcrypt'
import { LoggerModule } from '@elikar/logger'
import { JWTModule } from '@elikar/jwt'

import { ConfigService } from './config'
import { App } from './App'
import { NurseModule } from './nurse'
import { ElectroniceQueueModule } from './electronic-queue'

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
        ApplicationBuilderModule,
        LoggerModule,
        RpcServerModule,
        BcryptModule.register(config.get('bcrypt')),
        JWTModule.register(config.get('jwt')),
        NurseModule,
        ElectroniceQueueModule,
        MessageClientModule
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
