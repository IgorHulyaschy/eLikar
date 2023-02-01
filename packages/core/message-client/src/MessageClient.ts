import { injectable } from 'inversify'
import { AmqpTransport } from '@elikar/amqp'
import { Logger } from '@elikar/logger'
import { Tracing } from '@elikar/als'

import { Command } from './Command'

@injectable()
export class MessageClient {
  constructor(private readonly amqp: AmqpTransport, private readonly logger: Logger) {}

  emit(message: Command<any>): void {
    this.amqp.channel.sendToQueue(
      message.constructor.name,
      Buffer.from(JSON.stringify(message.payload)),
      {
        headers: {
          traceId: Tracing.getTrace()
        }
      }
    )
    this.logger.info(`Emitted ${message.constructor.name}`)
  }
}
