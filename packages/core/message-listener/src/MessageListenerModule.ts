import { Container } from 'inversify'
import { TYPES } from './constants'
import { MessageListener } from './MessageListener'

export class MessageListenerModule {
  container = new Container()
  init(options: { url: string }): Container {
    this.container.bind(TYPES.Options).toConstantValue(options)
    this.container.bind(MessageListener).toSelf().inSingletonScope()
    return this.container
  }
}
