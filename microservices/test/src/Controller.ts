import { Context } from 'koa'
import { get, post, useMiddleware, webController } from './decorators'
import { Middleware } from './Middleware'
import { Service } from './Service'

@webController('/auth')
export class Controller {
  constructor(private readonly service: Service) {}

  @useMiddleware(Middleware)
  @useMiddleware(Middleware)
  @get('/me')
  async getMe(ctx: Context): Promise<any> {
    this.service.foo()
    ctx.body = { message: 'me from method getMe' }
  }

  @post('/sign-in')
  signIn(ctx: Context): any {
    this.service.foo()
    ctx.body = { message: 'sign-in' }
  }

  services(): any {
    this.service.foo()
  }
}
