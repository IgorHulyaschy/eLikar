import { IModule, Module } from '@elikar/module'
import { MessageListener } from './MessageListener'

export class MessageListenerModule extends Module {
  register(): IModule {
    return {
      deps: {
        services(container) {
          container.bind(MessageListener).toSelf().inSingletonScope()
        }
      }
    }
  }
}
