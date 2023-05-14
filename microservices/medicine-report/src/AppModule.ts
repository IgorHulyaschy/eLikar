import { AmqpModule } from '@elikar/amqp'
import { MessageListenerModule } from '@elikar/message-listener'
import { ApplicationBuilderModule } from '@elikar/application'
import { RpcServerModule } from '@elikar/rpc-server'
import { IModule, module } from '@elikar/module'
import { TypeormModule } from '@elikar/typeorm'
import { LoggerModule } from '@elikar/logger'

import { ConfigService } from './config'
import { App } from './App'
import { MedicineReportModule } from './medicine-report'

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
        MedicineReportModule
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
