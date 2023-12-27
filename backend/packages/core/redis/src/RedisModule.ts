import { IModule, module } from '@elikar/module'

import { TYPES } from './constants'
import { Options } from './interfaces'
import { RedisService } from './RedisService'

@module()
export class RedisModule {
  static register(options: Options): IModule {
    return {
      deps: {
        services(container) {
          container.bind(RedisService).toSelf().inSingletonScope()
          container.bind<Options>(TYPES.Options).toConstantValue(options)
        }
      }
    }
  }
}
