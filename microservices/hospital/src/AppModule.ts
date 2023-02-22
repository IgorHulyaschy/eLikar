import { AmqpModule } from '@elikar/amqp'
// import { MessageClientModule } from '@elikar/message-client'
import { MessageListenerModule } from '@elikar/message-listener'
import { ApplicationModule, Modules } from '@elikar/module'
import { RpcServerModule } from '@elikar/rpc-server'
import { TypeormModule } from '@elikar/typeorm'

import { ConfigService } from './config'
import { HospitalModule } from './hospital'
import { LoggerModule } from '@elikar/logger'
import { App } from './App'
import { BcryptModule } from '@elikar/bcrypt'
import { JWTModule } from '@elikar/jwt'
import { ApplicationBuilderModule } from '@elikar/application'

export const TYPES = {
  Options: Symbol('Options')
}

export class AppModule extends ApplicationModule {
  constructor(private readonly config: ConfigService) {
    super()
  }

  init(): void {
    super.init()

    this.mainContainer.bind(App).toSelf().inSingletonScope()
    this.mainContainer.bind(TYPES.Options).toConstantValue(this.config.get('application'))
  }

  register(): Modules {
    return {
      import: () => [
        new TypeormModule().init(this.config.get('typeorm')),
        new AmqpModule().init(this.config.get('amqp')),
        new MessageListenerModule().init(),
        new LoggerModule().init(),
        new BcryptModule().init(this.config.get('bcrypt')),
        new JWTModule().init(this.config.get('jwt')),
        new ApplicationBuilderModule().init(),
        new RpcServerModule().init()
        // new MessageClientModule().init()
      ],
      local: () => [new HospitalModule().init()]
    }
  }
}
