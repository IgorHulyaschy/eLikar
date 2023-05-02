/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Context, Next } from 'koa'
import { HTTPError } from './HTTPError'

export class GlobalCatcher {
  static async use(ctx: Context, next: Next): Promise<any> {
    try {
      await next()
    } catch (err) {
      if (err.UNAUTHORIZED) {
        ctx.body = { error: err.message }
        ctx.status = 401
        return
      }
      if (err.TOKEN_EXPIRED) {
        ctx.body = { error: err.message }
        ctx.status = 400
      }
      if (err instanceof HTTPError) {
        ctx.body = {
          error: err.message
        }
        ctx.status = err.status
        return
      }
      ctx.body = { error: err.message }
      ctx.status = 500
    }
  }
}
