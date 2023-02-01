import { injectable } from 'inversify'
import { Context, Next } from 'koa'
import { Tracing } from '@elikar/als'
import { Middleware } from './Middleware'
import { randomUUID } from 'crypto'

@injectable()
export class TraceMiddleware extends Middleware {
  static async middleware(_ctx: Context, next: Next): Promise<any> {
    return Tracing.run(randomUUID(), next)
  }
}
