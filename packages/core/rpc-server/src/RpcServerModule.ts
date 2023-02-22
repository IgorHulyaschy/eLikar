import { Module } from '@elikar/module'
import { IModule } from '@elikar/module/src/interfaces'
import { RpcServer } from './RpcServer'

export class RpcServerModule extends Module {
  register(): IModule {
    return {
      deps: {
        services(container) {
          container.bind(RpcServer).toSelf().inSingletonScope()
        }
      }
    }
  }
}
