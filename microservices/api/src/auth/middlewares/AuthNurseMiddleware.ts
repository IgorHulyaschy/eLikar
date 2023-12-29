import { middleware } from '@elikar/application'
import { Context, Next } from 'koa'
import { NurseProxy } from '../../proxy'

import { UnauthorizedError } from '../errors'

@middleware()
export class AuthNurseMiddleware {
  constructor(private readonly service: NurseProxy) {}

  async use(ctx: Context, next: Next): Promise<void> {
    const token = ctx.request.headers.authorization?.split(' ')[1]
    if (!token) throw new UnauthorizedError()

    const nurse = await this.service.validateToken(token)
    if (!nurse) throw new Error()

    ctx.state = nurse
    next()
  }
}
