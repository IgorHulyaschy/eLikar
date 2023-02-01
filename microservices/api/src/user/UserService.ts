// import { UserCreateCommand } from '@elikar/commands'
// import { MessageClient } from '@elikar/message-client'
import { injectable } from 'inversify'
import { UserProxy } from '../proxy/UserProxy'

@injectable()
export class UserService {
  constructor(private readonly proxy: UserProxy) {}

  ping(): Promise<{ message: string }> {
    // this.messageClient.emit(new UserCreateCommand({ message: 'yeah' }))
    return this.proxy.ping()
  }
}
