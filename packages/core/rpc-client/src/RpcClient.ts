/* eslint-disable new-cap */
import { AmqpTransport } from '@elikar/amqp'
import { Logger } from '@elikar/logger'
import { injectable } from 'inversify'
import { Class } from 'type-fest'
import { Tracing } from '@elikar/als'
import { RpcError } from '@elikar/rpc-error-codes'

@injectable()
export class RpcClient {
  constructor(private readonly amqp: AmqpTransport, private readonly logger: Logger) {}

  async rpcCall(queueName: string, methodName: string, data: any): Promise<any> {
    const queue = await this.amqp.channel.assertQueue('', { exclusive: true })

    const promise = new Promise((resolve, reject) => {
      this.amqp.channel.consume(
        queue.queue,
        async (msg) => {
          if (!msg) return

          Tracing.run(msg.properties.headers.traceId as string, () => {
            // setTimeout(() => reject, 10 * 1000) // reject after no response

            const response = JSON.parse(msg.content.toString()).content

            if (response && response.code) {
              this.logger.info(
                `Rpc call to ${queueName + '.' + methodName} - failed with status-code: ${
                  response.code as number
                }`
              )
              reject(new RpcError(response.code))
              return
            }
            if (response && response.error) {
              reject(response.error)
              return
            }

            this.logger.info(`Rpc call to ${queueName + '.' + methodName} - success`)
            resolve(response)
          })
        },
        { noAck: true }
      )
    })
    this.logger.info(`Rpc call to ${queueName + '.' + methodName} - pending`)
    this.amqp.channel.sendToQueue(
      queueName,
      Buffer.from(data ? JSON.stringify(data) : JSON.stringify({ noContent: true })),
      {
        replyTo: queue.queue,
        headers: {
          method: methodName,
          traceId: Tracing.getTrace()
        }
      }
    )
    return promise
  }

  getService<RpcSchema>(rpcSchema: Class<RpcSchema>): RpcSchema {
    let queueName: string
    return Object.entries(new rpcSchema() as object).reduce((acc: any, [name, value]) => {
      if (name === 'queueName') {
        acc[name] = value
        queueName = value
      } else acc[name] = async (data: any) => this.rpcCall(queueName, name, data)
      return acc
    }, {})
  }
}
