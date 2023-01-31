import { Module } from '@elikar/module'

import { MessageClient } from './MessageClient'

export class MessageClientModule extends Module {
  register(): void {
    this.bind(MessageClient).toSelf().inSingletonScope()
  }
}
