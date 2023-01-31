import { WebController } from '@elikar/controller'
import { injectable } from 'inversify'
import { Context } from 'koa'
import { UserService } from './UserService'

@injectable()
export class UserWebController extends WebController {
  constructor(private readonly service: UserService) {
    super()
  }

  register(): void {
    this.get('/ping', this.ping)
  }

  ping = (ctx: Context): void => {
    ctx.body = this.service.ping()
  }
}
