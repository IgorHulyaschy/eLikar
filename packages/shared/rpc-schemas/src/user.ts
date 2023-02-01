export class UserRpcSchema {
  queueName = 'user_rpc_queue'
  ping: (data: { message: string }) => Promise<{ message: string }> = async (data: {
    message: string
  }): Promise<any> => {}
}
