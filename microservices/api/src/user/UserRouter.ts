import { injectable } from 'inversify'
import Router from 'koa-joi-router'
import { UserWebController } from './UserWebController'

@injectable()
export class UserRouter {
  router = Router()
  constructor(private readonly controller: UserWebController) {}

  bootstrap(): Router.Router {
    this.router.get('/ping', this.controller.ping)
    return this.router
  }
}
