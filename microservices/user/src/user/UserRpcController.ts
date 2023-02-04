import { injectable } from 'inversify'
import { UserRpcSchema } from '@elikar/rpc-schemas'
// import { UserService } from './UserService'

@injectable()
export class UserRpcController implements UserRpcSchema {
  queueName = 'user_rpc_queue'
  // constructor(private readonly service: UserService) {}

  async ping(data: any): Promise<any> {
    return data
  }
}
