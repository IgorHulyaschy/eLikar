import { DynamicModule, IModule } from '@elikar/module'

import { BcryptService } from './BcryptService'
import { TYPES } from './constants'
import { Options } from './interfaces'

export class BcryptModule extends DynamicModule<Options> {
  register(options: Options): IModule {
    return {
      deps: {
        services(container) {
          container.bind(BcryptService).toSelf().inSingletonScope()
          container.bind<Options>(TYPES.Options).toConstantValue(options)
        }
      }
    }
  }
}
