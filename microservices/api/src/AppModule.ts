import { ApplicationBuilderModule } from '@elikar/application'
import { MessageClientModule } from '@elikar/message-client'
import { IModule, module } from '@elikar/module'
import { RpcClientModule } from '@elikar/rpc-client'
import { LoggerModule } from '@elikar/logger'
import { AmqpModule } from '@elikar/amqp'

import { App } from './App'
import { ConfigService } from './config'
import { HospitalModule } from './hospital'
import { AuthModule } from './auth'
import { ProxyModule } from './proxy'
import { NurseModule } from './nurse'

export const TYPES = {
  Options: Symbol('App:Options')
}

export interface Options {
  port: number
}

@module()
export class AppModule {
  static register(config: ConfigService): IModule {
    return {
      imports: [
        AmqpModule.register(config.get('amqp')),
        MessageClientModule,
        LoggerModule,
        RpcClientModule,
        ApplicationBuilderModule,
        ProxyModule,
        HospitalModule,
        AuthModule,
        NurseModule
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
