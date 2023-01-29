import { Container } from 'inversify'
import { Logger } from './Logger'

export class LoggerModule {
  container = new Container()
  init(): Container {
    this.container.bind(Logger).toSelf().inSingletonScope()
    return this.container
  }
}
