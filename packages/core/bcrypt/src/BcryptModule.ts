import { IModule, module } from '@elikar/module'

import { BcryptService } from './BcryptService'
import { TYPES } from './constants'
import { Options } from './interfaces'

@module()
export class BcryptModule {
  static register(options: Options): IModule {
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
