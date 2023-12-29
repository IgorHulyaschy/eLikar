import { AmqpModule } from '@elikar/amqp'
import { ApplicationBuilderModule } from '@elikar/application'
import { RpcServerModule } from '@elikar/rpc-server'
import { IModule, module } from '@elikar/module'
import { LoggerModule } from '@elikar/logger'

import { ConfigService } from './config'
import { App } from './App'
import { ReportGeneratorModule } from './report-generator'

export const TYPES = {
  Options: Symbol('options')
}

@module()
export class AppModule {
  static register(config: ConfigService): IModule {
    return {
      imports: [
        AmqpModule.register(config.get('amqp')),
        ApplicationBuilderModule,
        LoggerModule,
        RpcServerModule,
        ReportGeneratorModule
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
