import { injectable } from 'inversify'
import { AmqpTransport } from '@elikar/amqp'
import { Logger } from '@elikar/logger'
import { Tracing } from '@elikar/als'

@injectable()
export abstract class MessageListener {
  handlers: Array<{ queue: string; handler: (any: any) => any | Promise<any> }> = []

  constructor(private readonly amqp: AmqpTransport, private readonly logger: Logger) {}

  async subscribe(queue: string, cb: (any: any) => any | Promise<any>): Promise<void> {
    await this.amqp.channel.assertQueue(queue)

    this.amqp.channel.consume(queue, async (msg) => {
      if (!msg) return

      Tracing.run(msg.properties.headers.traceId as string, async () => {
        this.logger.info(`Consumed message ${msg.properties.headers.messageName as string}`)
        await cb(JSON.parse(msg.content.toString()))

        this.amqp.channel.ack(msg)
      })
    })
  }

  on(handler: { queue: string; handler: (any: any) => Promise<any> }): void {
    this.handlers.push(handler)
  }

  async bootstrap(): Promise<void> {
    await Promise.all(this.handlers.map(({ queue, handler }) => this.subscribe(queue, handler)))
    this.logger.info('Amqp message listener has bootstraped')
  }
}
