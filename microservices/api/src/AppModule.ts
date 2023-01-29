import { Container, decorate, injectable, interfaces } from 'inversify'
import { MessageClientModule } from '@elikar/message-client'
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

export class AppModule {
  mainContainer!: interfaces.Container
  constructor(private readonly config: ConfigService) {}

  init(): void {
    decorate(injectable(), Koa)

    const [local, ...otherLocalModules] = this.localModules()
    const [dep, ...otherImportedModules] = this.importedModules()

    this.mainContainer = Container.merge(local, dep, ...otherLocalModules, ...otherImportedModules)

    // only for web server
    this.mainContainer.bind(App).toSelf().inSingletonScope()
    this.mainContainer.bind<Options>(TYPES.Options).toConstantValue(this.config.get('web'))
  }

  private localModules(): Container[] {
    return [new UserModule().init()]
  }

  private importedModules(): Container[] {
    return [new MessageClientModule().init(this.config.get('amqp')), new LoggerModule().init()]
  }

  get<T>(servicesIdentifier: interfaces.ServiceIdentifier<T>): T {
    return this.mainContainer.get(servicesIdentifier)
  }
}
