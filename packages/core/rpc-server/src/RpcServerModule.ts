import { module } from '@elikar/module'
import { RpcServer } from './RpcServer'

@module({
  deps: {
    services(local) {
      local.bind(RpcServer).toSelf().inSingletonScope()
    }
  }
})
export class RpcServerModule {}
