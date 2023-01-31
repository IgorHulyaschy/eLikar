import { MessageListener } from '@elikar/message-listener'
import { injectable } from 'inversify'
import { Class } from 'type-fest'

@injectable()
export abstract class CommandController {
  constructor(private readonly messageListener: MessageListener) {}

  async bootstrap(): Promise<void> {
    this.register()
    await this.messageListener.bootstrap()
  }

  abstract register(): void

  on<T>(command: Class<T>, handler: (any: any) => any): void {
    this.messageListener.on(command, handler)
  }
}
