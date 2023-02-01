export interface Options<Ctor> {
  rpcSchema: Ctor & { queueName: string }
}
