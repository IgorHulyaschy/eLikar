import { MessageListenerModule } from '@elikar/message-listener'
import { ApplicationModule, Modules } from '@elikar/module'
import { RpcServerModule } from '@elikar/rpc-server'
import { LoggerModule } from '@elikar/logger'
import { AmqpModule } from '@elikar/amqp'
import { UserRpcSchema } from '@elikar/rpc-schemas'

import { ConfigService } from './config'
import { UserModule } from './user'
import { App } from './App'
import { UserRpcController } from './user/UserRpcController'

export class AppModule extends ApplicationModule {
  constructor(private readonly config: ConfigService) {
    super()
  }

  init(): void {
    super.init()

    this.mainContainer.bind(App).toSelf().inSingletonScope()
  }

  modules(): Modules {
    return {
      import: () => [
        new AmqpModule().init(this.config.get('amqp')),
        new MessageListenerModule().init(),
        new LoggerModule().init()
      ],
      local: () => [new UserModule().init()],
      rpc: () => [
        new RpcServerModule<UserRpcSchema>().init({
          rpcSchema: this.get(UserRpcController)
        })
      ]
    }
  }
}
