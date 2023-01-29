import { UserCreateCommand } from '@elikar/commands'
import { MessageClient } from '@elikar/message-client'
import { injectable } from 'inversify'

@injectable()
export class UserService {
  constructor(private readonly messageClient: MessageClient) {}

  ping(): { message: string } {
    this.messageClient.emit(new UserCreateCommand({ message: 'yeah' }))
    return { message: 'pong' }
  }
}
