import { inject, injectable } from 'inversify'
import { Logger } from '@elikar/logger'
import amqplib from 'amqplib'

import * as interfaces from './interfaces'
import { TYPES } from './constants'

@injectable()
export class AmqpTransport {
  channel!: amqplib.Channel
  constructor(
    @inject(TYPES.Options) private readonly config: interfaces.Options,
    private readonly logger: Logger
  ) {}

  async bootstrap(): Promise<void> {
    this.channel = await amqplib.connect(this.config.url).then((conn) => conn.createChannel())
    this.logger.info('Amqp server has bootstraped')
  }
}
