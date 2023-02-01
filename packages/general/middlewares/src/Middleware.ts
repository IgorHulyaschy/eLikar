import { injectable } from 'inversify'
import { Context, Next } from 'koa'

@injectable()
export abstract class Middleware {
  static async middleware(ctx: Context, next: Next): Promise<any> {}
}
