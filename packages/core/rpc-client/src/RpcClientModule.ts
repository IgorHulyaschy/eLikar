import { module } from '@elikar/module'
import { RpcClient } from './RpcClient'

@module({
  deps: {
    services(container) {
      container.bind(RpcClient).toSelf().inSingletonScope()
    }
  }
})
export class RpcClientModule {}
