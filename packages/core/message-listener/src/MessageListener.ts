import { inject, injectable } from 'inversify'
import { Class } from 'type-fest'
import { Logger } from '@elikar/logger'
import amqplib from 'amqplib'
import { TYPES } from './constants'

@injectable()
export abstract class MessageListener {
  channel!: amqplib.Channel
  handlers: Array<{ queue: string; handler: (any: any) => any | Promise<any> }> = []
  private readonly url: string

  constructor(@inject(TYPES.Options) { url }: { url: string }, private readonly logger: Logger) {
    this.url = url
  }

  async subscribe(queue: string, cb: (any: any) => any | Promise<any>): Promise<void> {
    await this.channel.assertQueue(queue)

    this.channel.consume(queue, async (msg) => {
      if (!msg) return

      await cb(JSON.parse(msg.content.toString()))

      this.channel.ack(msg)
    })
  }

  on<T>(command: Class<T>, handler: (any: any) => any): void {
    this.handlers.push({ queue: command.name, handler })
  }

  async bootstrap(): Promise<void> {
    this.channel = await amqplib.connect(this.url).then((conn) => conn.createChannel())
    await Promise.all(this.handlers.map(({ queue, handler }) => this.subscribe(queue, handler)))
    this.logger.info('Amqp message listener has bootstraped')
  }
}
