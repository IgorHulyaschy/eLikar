import { inject, injectable } from 'inversify'
import { DomainApplication } from '@elikar/application'
import { BotProvider } from '@elikar/bot-provider'

import { TYPES } from './AppModule'
import { AmqpTransport } from '@elikar/amqp'

@injectable()
export class App extends DomainApplication {
  constructor(
    @inject(TYPES.Options) { name }: { name: string },
    private readonly amqp: AmqpTransport,
    readonly botProvider: BotProvider
  ) {
    super({ name, botProvider })
  }

  async init(): Promise<void> {
    await this.amqp.bootstrap()
  }
}
