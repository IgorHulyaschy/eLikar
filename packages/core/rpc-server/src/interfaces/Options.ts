export interface Options<Ctor> {
  queueName: string
  rpcSchema: Ctor & { queueName: string }
}
