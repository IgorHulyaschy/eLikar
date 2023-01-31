import { Module } from '@elikar/module'
import { MessageListener } from './MessageListener'

export class MessageListenerModule extends Module {
  register(): void {
    this.bind(MessageListener).toSelf().inSingletonScope()
  }
}
