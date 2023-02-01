/* eslint-disable new-cap */
import { AmqpTransport } from '@elikar/amqp'
import { Logger } from '@elikar/logger'
import { injectable } from 'inversify'
import { Class } from 'type-fest'

@injectable()
export class RpcClient {
  constructor(private readonly amqp: AmqpTransport, private readonly logger: Logger) {}

  async rpcCall(queueName: string, methodName: string, data: any): Promise<any> {
    const queue = await this.amqp.channel.assertQueue('', { exclusive: true })

    const promise = new Promise((resolve) => {
      this.amqp.channel.consume(
        queue.queue,
        async (msg) => {
          this.logger.info(`Rpc call to ${queueName + ' ' + methodName} - success`)
          if (!msg) return

          resolve(JSON.parse(msg.content.toString()))
        },
        { noAck: true }
      )
    })
    this.logger.info(`Rpc call to ${queueName + ' ' + methodName} - pending`)
    this.amqp.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
      replyTo: queue.queue,
      headers: {
        method: methodName
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
