import { AmqpTransport } from '@elikar/amqp'
import { inject, injectable } from 'inversify'

import { Options, TYPES } from './AppModule'
import { KoaApplication } from '@elikar/application'

@injectable()
export class App extends KoaApplication {
  constructor(private readonly amqpServer: AmqpTransport, @inject(TYPES.Options) options: Options) {
    super(options)
  }

  async init(): Promise<void> {
    await this.amqpServer.bootstrap()
  }
}
