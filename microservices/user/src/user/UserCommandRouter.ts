import { MessageListener } from '@elikar/message-listener'
import { UserCreateCommand } from '@elikar/commands'
import { injectable } from 'inversify'
import { UserCommandController } from './UserCommandController'

@injectable()
export class UserCommandRouter {
  constructor(
    private readonly controller: UserCommandController,
    private readonly messageListener: MessageListener
  ) {}

  async bootstrap(): Promise<void> {
    this.messageListener.on(UserCreateCommand, this.controller.createUser)
  }
}
