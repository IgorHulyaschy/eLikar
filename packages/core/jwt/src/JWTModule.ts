import { IModule, module } from '@elikar/module'
import { TYPES } from './contants'
import { Options } from './interfaces'
import { JWTService } from './JWTService'

@module()
export class JWTModule {
  static register(options: Options): IModule {
    return {
      deps: {
        services(container) {
          container.bind(JWTService).toSelf().inSingletonScope()
          container.bind<Options>(TYPES.Options).toConstantValue(options)
        }
      }
    }
  }
}
