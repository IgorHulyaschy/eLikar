import { injectable } from 'inversify'
import { Context, Next } from 'koa'
import { Tracing } from '@elikar/als'

import { randomUUID } from 'crypto'

@injectable()
export class TraceMiddleware {
  static async use(_ctx: Context, next: Next): Promise<any> {
    return Tracing.run(randomUUID(), next)
  }
}
