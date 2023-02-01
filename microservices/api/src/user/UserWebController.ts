import { UserCreateCommand } from '@elikar/commands'
import { WebController } from '@elikar/controller'
import { MessageClient } from '@elikar/message-client'
import { injectable } from 'inversify'
import { Context } from 'koa'

import { UserService } from './UserService'

@injectable()
export class UserWebController extends WebController {
  constructor(
    private readonly service: UserService,
    private readonly messageClient: MessageClient
  ) {
    super()
  }

  register(): void {
    this.get('/ping', this.ping)
    this.get('/pong', this.pong)
  }

  ping = async (ctx: Context): Promise<void> => {
    ctx.body = await this.service.ping()
  }

  pong = async (ctx: Context): Promise<void> => {
    this.messageClient.emit(new UserCreateCommand({ message: 'yeah' }))
    ctx.body = { message: 'ping' }
  }
}
