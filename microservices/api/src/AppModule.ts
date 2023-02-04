import { decorate, injectable } from 'inversify'
import { MessageClientModule } from '@elikar/message-client'
import { ApplicationModule, Modules } from '@elikar/module'
import { RpcClientModule } from '@elikar/rpc-client'
import { LoggerModule } from '@elikar/logger'
import { AmqpModule } from '@elikar/amqp'
import Koa from 'koa'

import { App } from './App'
import { ConfigService } from './config'
import { HospitalModule } from './hospital'

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
    decorate(injectable(), Koa)
    this.mainContainer.bind(App).toSelf().inSingletonScope()
    this.mainContainer.bind<Options>(TYPES.Options).toConstantValue(this.config.get('web'))
  }

  modules(): Modules {
    return {
      import: () => [
        new AmqpModule().init(this.config.get('amqp')),
        new MessageClientModule().init(),
        new LoggerModule().init(),
        new RpcClientModule().init()
      ],
      local: () => [new HospitalModule().init()]
    }
  }
}
