import { injectable } from 'inversify'
// import { UserService } from './UserService'

@injectable()
export class UserRpcController {
  queueName = 'user_rpc_queue'
  // constructor(private readonly service: UserService) {}

  async ping(data: any): Promise<any> {
    return data
  }
}
