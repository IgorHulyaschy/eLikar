import { injectable } from 'inversify'
import { AmqpTransport } from '@elikar/amqp'

import { Command } from './Command'
import { Logger } from '@elikar/logger'

@injectable()
export class MessageClient {
  constructor(private readonly amqp: AmqpTransport, private readonly logger: Logger) {}

  emit(message: Command<any>): void {
    this.logger.info(`Emitting ${message.constructor.name}`)
    this.amqp.channel.sendToQueue(
      message.constructor.name,
      Buffer.from(JSON.stringify(message.payload))
    )
  }
}
