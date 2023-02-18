import { Context, Next } from 'koa'
import { middleware } from './decorators'
import { Service } from './Service'
let counter = 0
@middleware()
export class Middleware {
  constructor(private readonly service: Service) {}
  use(ctx: Context, next: Next): any {
    console.log('middleware', counter + 1)
    counter += 1
    this.service.middleware()
    next()
  }
}
