import { DynamicModule } from '@elikar/module'
import { IModule } from '@elikar/module/src/interfaces'
import { TYPES } from './constants'
import { Options } from './interfaces'
import { RpcServer } from './RpcServer'

export class RpcServerModule<RpcShema> extends DynamicModule<Options<RpcShema>> {
  register(options: Options<RpcShema>): IModule {
    return {
      deps: {
        services(container) {
          container.bind(RpcServer).toSelf().inSingletonScope()
          container.bind<Options<RpcShema>>(TYPES.Options).toConstantValue(options)
        }
      }
    }
  }
}
