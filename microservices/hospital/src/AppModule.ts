import { AmqpModule } from '@elikar/amqp'
// import { MessageClientModule } from '@elikar/message-client'
import { MessageListenerModule } from '@elikar/message-listener'
import { ApplicationModule, Modules } from '@elikar/module'
import { RpcServerModule } from '@elikar/rpc-server'
import { TypeormModule } from '@elikar/typeorm'
import { HospitalRpcSchema } from '@elikar/rpc-schemas'

import { ConfigService } from './config'
import { HospitalModule } from './hospital'
import { HospitalRpcController } from './hospital/HospitalRpcController'
import { LoggerModule } from '@elikar/logger'
import { App } from './App'
import { BcryptModule } from '@elikar/bcrypt'
import { JWTModule } from '@elikar/jwt'

export class AppModule extends ApplicationModule {
  constructor(private readonly config: ConfigService) {
    super()
  }

  init(): void {
    super.init()

    this.mainContainer.bind(App).toSelf().inSingletonScope()
  }

  register(): Modules {
    return {
      import: () => [
        new TypeormModule().init(this.config.get('typeorm')),
        new AmqpModule().init(this.config.get('amqp')),
        new MessageListenerModule().init(),
        new LoggerModule().init(),
        new BcryptModule().init(this.config.get('bcrypt')),
        new JWTModule().init(this.config.get('jwt'))
        // new MessageClientModule().init()
      ],
      local: () => [new HospitalModule().init()],
      rpc: () => [
        new RpcServerModule<HospitalRpcSchema>().init({
          rpcSchema: this.get(HospitalRpcController)
        })
      ]
    }
  }
}
