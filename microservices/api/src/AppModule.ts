import { MessageClientModule } from '@elikar/message-client'
import { ApplicationModule, IModule } from '@elikar/module'
import { RpcClientModule } from '@elikar/rpc-client'
import { LoggerModule } from '@elikar/logger'
import { AmqpModule } from '@elikar/amqp'

import { App } from './App'
import { ConfigService } from './config'
import { HospitalModule } from './hospital'
import { AuthModule } from './auth'
import { ApplicationBuilderModule } from '@elikar/application'

export const TYPES = {
  Options: Symbol('App:Options')
}

export interface Options {
  port: number
}

export class AppModule extends ApplicationModule {
  static register(config: ConfigService): IModule {
    return {
      imports: [
        AmqpModule.register(config.get('amqp')),
        MessageClientModule,
        LoggerModule,
        RpcClientModule,
        ApplicationBuilderModule,
        HospitalModule,
        AuthModule
      ],
      deps: {
        services(local) {
          local.bind(App).toSelf().inSingletonScope()
          local.bind<Options>(TYPES.Options).toConstantValue(config.get('web'))
        }
      }
    }
  }
}
