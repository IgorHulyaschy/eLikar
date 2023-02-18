/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Context, Next } from 'koa'

export class GlobalCatcher {
  static async use(ctx: Context, next: Next): Promise<any> {
    try {
      await next()
    } catch (err) {
      ctx.body = { error: err.message }
    }
  }
}
