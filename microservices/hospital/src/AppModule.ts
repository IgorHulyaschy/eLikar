import { AmqpModule } from '@elikar/amqp'
// import { MessageClientModule } from '@elikar/message-client'
import { MessageListenerModule } from '@elikar/message-listener'
import { IModule } from '@elikar/module'
import { RpcServerModule } from '@elikar/rpc-server'
import { TypeormModule } from '@elikar/typeorm'
import { BcryptModule } from '@elikar/bcrypt'
import { JWTModule } from '@elikar/jwt'
import { ApplicationBuilderModule } from '@elikar/application'
import { LoggerModule } from '@elikar/logger'
import { RpcClientModule } from '@elikar/rpc-client'

import { ConfigService } from './config'
import { HospitalModule } from './hospital'
import { App } from './App'
import { MailerModule } from './mailer'

export const TYPES = {
  Options: Symbol('Options')
}

export class AppModule {
  static register(config: ConfigService): IModule {
    return {
      imports: [
        TypeormModule.register(config.get('typeorm')),
        AmqpModule.register(config.get('amqp')),
        MessageListenerModule,
        LoggerModule,
        BcryptModule.register(config.get('bcrypt')),
        JWTModule.register(config.get('jwt')),
        ApplicationBuilderModule,
        RpcServerModule,
        RpcClientModule,
        MailerModule,
        HospitalModule
        // new MessageClientModule().init()
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
