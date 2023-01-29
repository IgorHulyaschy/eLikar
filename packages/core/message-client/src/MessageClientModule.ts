import { Container } from 'inversify'
import { TYPES } from './constants'
import { type Options } from './interfaces'
import { MessageClient } from './MessageClient'

export class MessageClientModule {
  container = new Container()

  init(options: Options): Container {
    this.container.bind<Options>(TYPES.Options).toConstantValue(options)
    this.container.bind(MessageClient).toSelf().inSingletonScope()
    return this.container
  }
}
