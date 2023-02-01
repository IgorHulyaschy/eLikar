import { inject, injectable } from 'inversify'
import { AmqpTransport } from '@elikar/amqp'
import { TYPES } from './constants'
import { Options } from './interfaces'
import { Logger } from '@elikar/logger'

@injectable()
export class RpcServer<RpcSchema extends Record<string, (data: any) => Promise<any>>> {
  rpc: RpcSchema
  private readonly queueName: string
  constructor(
    @inject(TYPES.Options) { queueName, rpcSchema }: Options<any>,
    private readonly amqp: AmqpTransport,
    private readonly logger: Logger
  ) {
    this.queueName = queueName
    this.rpc = rpcSchema
  }

  async bootstrap(): Promise<void> {
    await this.init()
    this.logger.info('Rpc server has bootstraped')
  }

  async init(): Promise<void> {
    this.amqp.channel.assertQueue(this.queueName, { durable: false })
    this.amqp.channel.prefetch(1)
    this.amqp.channel.consume(this.queueName, async (msg) => {
      if (!msg) return
      this.logger.info(`Rpc call ${msg.properties.headers.method as string} - request`)
      const data = JSON.parse(msg.content.toString())
      const res = await this.rpc[msg.properties.headers.method as keyof typeof this.rpc](data)

      this.amqp.channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(res)))
      this.logger.info(`Rpc call ${msg.properties.headers.method as string} - response`)
      this.amqp.channel.ack(msg)
    })
  }
}
