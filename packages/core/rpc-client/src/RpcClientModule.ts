import { IModule, Module } from '@elikar/module'
import { RpcClient } from './RpcClient'

export class RpcClientModule extends Module {
  register(): IModule {
    return {
      deps: {
        services(container) {
          container.bind(RpcClient).toSelf().inSingletonScope()
        }
      }
    }
  }
}
