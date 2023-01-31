import amqp from 'amqplib'

class RpcServer {
  channel!: amqp.Channel
  async bootstrap(): Promise<void> {
    this.channel = await amqp.connect('amqp://localhost').then((conn) => conn.createChannel())
  }

  async init(cb: (any: any) => Promise<any>): Promise<any> {
    this.channel.assertQueue('rpc_queue', { durable: false })
    this.channel.prefetch(1)
    this.channel.consume('rpc_queue', async (msg) => {
      if (!msg) return

      const data = JSON.parse(msg.content.toString())
      const res = await cb(data)
      this.channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(res)))
      this.channel.ack(msg)
    })
  }
}

class RpcClient {
  channel!: amqp.Channel
  async bootstrap(): Promise<void> {
    this.channel = await amqp.connect('amqp://localhost').then((conn) => conn.createChannel())
  }

  async rpcCall(data: any, cb: any): Promise<any> {
    const queue = await this.channel.assertQueue('', { exclusive: true })

    const promise = new Promise((resolve) => {
      this.channel.consume(
        queue.queue,
        async (msg) => {
          if (!msg) return
          const data = await cb(JSON.parse(msg.content.toString()))
          resolve(data)
        },
        { noAck: true }
      )
    })
    this.channel.sendToQueue('rpc_queue', Buffer.from(JSON.stringify(data)), {
      replyTo: queue.queue
    })
    return promise
  }
}

async function foo(): Promise<any> {
  const server = new RpcServer()
  const client = new RpcClient()

  await Promise.all([server.bootstrap(), client.bootstrap()])

  await server.init(async (data: { message: { message: string } }): Promise<any> => {
    return data.message
  })

  const res1 = await client.rpcCall(
    { message: { message: 'yeah' } },
    async (data: { message: string }): Promise<any> => data
  )

  const res2 = await client.rpcCall(
    { message: { message: { message: 'yeah2' } } },
    async (data: { message: string }): Promise<any> => data
  )
  console.log(res1, res2)
}

foo()
