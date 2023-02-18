import { DynamicModule, IModule } from '@elikar/module'
import { ConnectionOptions } from 'typeorm'
import { TYPES } from './constants'
import { TypeormProvider } from './TypeormProvider'

export class TypeormModule extends DynamicModule<ConnectionOptions> {
  register(options: ConnectionOptions): IModule {
    return {
      deps: {
        services(container) {
          container.bind(TypeormProvider).toSelf().inSingletonScope()
          container.bind<ConnectionOptions>(TYPES.Options).toConstantValue(options)
        }
      }
    }
  }
}
