import { injectable } from 'inversify'
import { AmqpTransport } from '@elikar/amqp'
import { RpcError } from '@elikar/rpc-error-codes'
import { Tracing } from '@elikar/als'
import { Logger } from '@elikar/logger'

@injectable()
export class RpcServer<RpcSchema extends Record<string, (data: any) => Promise<any>>> {
  rpc!: RpcSchema
  queueName!: string
  constructor(private readonly amqp: AmqpTransport, private readonly logger: Logger) {}

  async bootstrap(): Promise<void> {
    await this.init()
    this.logger.info('Rpc server has bootstraped')
  }

  setQueue(queue: string): void {
    this.queueName = queue
  }

  setRpcController(rpcController: RpcSchema): void {
    this.rpc = rpcController
  }

  async init(): Promise<void> {
    this.amqp.channel.assertQueue(this.queueName, { durable: false })
    this.amqp.channel.prefetch(1)
    this.amqp.channel.consume(this.queueName, async (msg) => {
      if (!msg) return
      Tracing.run(msg.properties.headers.traceId as string, async () => {
        this.logger.info(`Rpc call ${msg.properties.headers.method as string} - request`)
        const data = JSON.parse(msg.content.toString())
        let response
        try {
          response = await this.rpc[msg.properties.headers.method as keyof typeof this.rpc](data)
        } catch (err) {
          if (err instanceof RpcError) {
            response = { code: err.code }
          } else {
            response = { error: err }
          }
        }
        this.amqp.channel.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(JSON.stringify(response ?? { success: true })),
          {
            headers: {
              traceId: Tracing.getTrace()
            }
          }
        )
        this.logger.info(`Rpc call ${msg.properties.headers.method as string} - response`)
        this.amqp.channel.ack(msg)
      })
    })
  }
}
