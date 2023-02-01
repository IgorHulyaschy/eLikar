// import amqp from 'amqplib'

class RpcSchema {
  queueName = 'rpc_queue'
  ping: () => Promise<void> = async () => {}
}

async function rpcCall(name: any, data: any): Promise<any> {
  console.log('called', name, data)
}
const instance = new RpcSchema()
const res = Object.entries(instance).reduce((acc: any, [name, value]) => {
  if (name === 'queueName') acc[name] = value
  else acc[name] = (data: any) => rpcCall(name, data)
  return acc
}, {})
console.log(res.queueName)
console.log(res.ping({ message: 'yeah' }))
// async function foo(): Promise<any> {
//   const server = new RpcServer()
//   const client = new RpcClient()

//   await Promise.all([server.bootstrap(), client.bootstrap()])

//   await server.init(async (data: { message: { message: string } }): Promise<any> => {
//     return data.message
//   })

//   const res1 = await client.rpcCall(
//     { message: { message: 'yeah' } },
//     async (data: { message: string }): Promise<any> => data
//   )

//   const res2 = await client.rpcCall(
//     { message: { message: { message: 'yeah2' } } },
//     async (data: { message: string }): Promise<any> => data
//   )
//   console.log(res1, res2)
// }

// foo()
