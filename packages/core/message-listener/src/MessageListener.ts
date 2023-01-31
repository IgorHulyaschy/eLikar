import { injectable } from 'inversify'
import { AmqpTransport } from '@elikar/amqp'
import { Class } from 'type-fest'
import { Logger } from '@elikar/logger'

@injectable()
export abstract class MessageListener {
  handlers: Array<{ queue: string; handler: (any: any) => any | Promise<any> }> = []

  constructor(private readonly amqp: AmqpTransport, private readonly logger: Logger) {}

  async subscribe(queue: string, cb: (any: any) => any | Promise<any>): Promise<void> {
    await this.amqp.channel.assertQueue(queue)

    this.amqp.channel.consume(queue, async (msg) => {
      if (!msg) return

      await cb(JSON.parse(msg.content.toString()))

      this.amqp.channel.ack(msg)
    })
  }

  on<T>(command: Class<T>, handler: (any: any) => any): void {
    this.handlers.push({ queue: command.name, handler })
  }

  async bootstrap(): Promise<void> {
    await Promise.all(this.handlers.map(({ queue, handler }) => this.subscribe(queue, handler)))
    this.logger.info('Amqp message listener has bootstraped')
  }
}
