import { MessageClientModule } from '@elikar/message-client'
import { ApplicationModule, Modules } from '@elikar/module'
import { RpcClientModule } from '@elikar/rpc-client'
import { LoggerModule } from '@elikar/logger'
import { AmqpModule } from '@elikar/amqp'

import { App } from './App'
import { ConfigService } from './config'
import { HospitalModule } from './hospital'
import { AuthModule } from './auth'
import { ApplicationBuilderModule } from '@elikar/application'

export const TYPES = {
  Options: Symbol('App:Options')
}

export interface Options {
  port: number
}

export class AppModule extends ApplicationModule {
  constructor(private readonly config: ConfigService) {
    super()
  }

  init(): void {
    super.init()

    // only for web server
    this.mainContainer.bind(App).toSelf().inSingletonScope()
    this.mainContainer.bind<Options>(TYPES.Options).toConstantValue(this.config.get('web'))
  }

  register(): Modules {
    return {
      import: () => [
        new AmqpModule().init(this.config.get('amqp')),
        new MessageClientModule().init(),
        new LoggerModule().init(),
        new RpcClientModule().init(),
        new ApplicationBuilderModule().init(this.config.get('web'))
      ],
      local: () => [new HospitalModule().init(), new AuthModule().init()]
    }
  }
}
