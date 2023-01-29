import { inject, injectable } from 'inversify'
import { Logger } from '@elikar/logger'
import amqplib from 'amqplib'

import { TYPES } from './constants'
import * as interfaces from './interfaces'
import { Command } from './Command'

@injectable()
export class MessageClient {
  channel!: amqplib.Channel
  constructor(
    @inject(TYPES.Options) private readonly config: interfaces.Options,
    private readonly logger: Logger
  ) {}

  async bootstrap(): Promise<void> {
    this.channel = await amqplib.connect(this.config.url).then((conn) => conn.createChannel())
    this.logger.info('Amqp message client has bootstraped')
  }

  emit(message: Command<any>): boolean {
    return this.channel.sendToQueue(
      message.constructor.name,
      Buffer.from(JSON.stringify(message.payload))
    )
  }
}
