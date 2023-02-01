/* eslint-disable new-cap */
import { AmqpTransport } from '@elikar/amqp'
import { Logger } from '@elikar/logger'
import { injectable } from 'inversify'
import { Class } from 'type-fest'
import { Tracing } from '@elikar/als'

@injectable()
export class RpcClient {
  constructor(private readonly amqp: AmqpTransport, private readonly logger: Logger) {}

  async rpcCall(queueName: string, methodName: string, data: any): Promise<any> {
    const queue = await this.amqp.channel.assertQueue('', { exclusive: true })

    const promise = new Promise((resolve) => {
      this.amqp.channel.consume(
        queue.queue,
        async (msg) => {
          if (!msg) return
          Tracing.run(msg.properties.headers.traceId as string, () => {
            this.logger.info(`Rpc call to ${queueName + '.' + methodName} - success`)
            resolve(JSON.parse(msg.content.toString()))
          })
        },
        { noAck: true }
      )
    })
    this.logger.info(`Rpc call to ${queueName + '.' + methodName} - pending`)
    this.amqp.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
      replyTo: queue.queue,
      headers: {
        method: methodName,
        traceId: Tracing.getTrace()
      }
    })
    return promise
  }

  getService<RpcSchema>(rpcSchema: Class<RpcSchema>): RpcSchema {
    const instance = new rpcSchema()
    let queueName: string
    return Object.entries(instance as object).reduce((acc: any, [name, value]) => {
      if (name === 'queueName') {
        acc[name] = value
        queueName = value
      } else acc[name] = (data: any) => this.rpcCall(queueName, name, data)
      return acc
    }, {})
  }
}
