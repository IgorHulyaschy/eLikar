import { injectable } from 'inversify'
import { Context } from 'koa'
import { UserService } from './UserService'

@injectable()
export class UserWebController {
  constructor(private readonly service: UserService) {}
  ping = (ctx: Context): void => {
    ctx.body = this.service.ping()
  }
}
