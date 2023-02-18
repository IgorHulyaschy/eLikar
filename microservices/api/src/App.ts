import { AmqpTransport } from '@elikar/amqp'
import { inject, injectable } from 'inversify'
import { Logger } from '@elikar/logger'

import { Options, TYPES } from './AppModule'
import { ApplicationBuilder, KoaApplication } from '@elikar/application'

@injectable()
export class App extends KoaApplication {
  constructor(
    private readonly amqpServer: AmqpTransport,
    logger: Logger,
    @inject(TYPES.Options) options: Options,
    applicationBuilder: ApplicationBuilder
  ) {
    super(options, applicationBuilder, logger)
  }

  async init(): Promise<void> {
    await this.amqpServer.bootstrap()
  }
}
