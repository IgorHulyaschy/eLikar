import { IModule, Module } from '@elikar/module'

import { MessageClient } from './MessageClient'

export class MessageClientModule extends Module {
  register(): IModule {
    return {
      deps: {
        services(container) {
          container.bind(MessageClient).toSelf().inSingletonScope()
        }
      }
    }
  }
}
