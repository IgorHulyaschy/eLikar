import { DynamicModule, IModule } from '@elikar/module'
import { AmqpTransport } from './AmqpTransport'
import { TYPES } from './constants'
import { Options } from './interfaces'

export class AmqpModule extends DynamicModule<Options> {
  register(options: Options): IModule {
    return {
      deps: {
        services(container) {
          container.bind<Options>(TYPES.Options).toConstantValue(options)
          container.bind(AmqpTransport).toSelf().inSingletonScope()
        }
      }
    }
  }
}
