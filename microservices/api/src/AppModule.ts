import { Container, decorate, injectable } from 'inversify'
import { MessageClientModule } from '@elikar/message-client'
import { ApplicationModule } from '@elikar/application'
import { LoggerModule } from '@elikar/logger'
import Koa from 'koa'

import { App } from './App'
import { ConfigService } from './config'
import { UserModule } from './user'

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

  localModules(): Container[] {
    return [new UserModule().init()]
  }

  importedModules(): Container[] {
    return [new MessageClientModule().init(this.config.get('amqp')), new LoggerModule().init()]
  }
}
