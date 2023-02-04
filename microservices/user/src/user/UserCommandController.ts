import { MessageListener } from '@elikar/message-listener'
import { UserCreateCommand } from '@elikar/commands'
import { injectable } from 'inversify'
import { CommandController } from '@elikar/controller'
import { UserService } from './UserService'

@injectable()
export class UserCommandController extends CommandController {
  constructor(private readonly service: UserService, messageListener: MessageListener) {
    super(messageListener)
    this.on(UserCreateCommand, this.createUser)
  }

  createUser = async (data: any): Promise<void> => {
    this.service.createUser(data)
  }
}
