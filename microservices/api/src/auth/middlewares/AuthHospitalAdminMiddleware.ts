import { middleware } from '@elikar/application'
import { Context, Next } from 'koa'

// import { HospitalService } from '../../hospital'
import { HospitalProxy } from '../../hospital/HospitalProxy'
import { UnauthorizedError } from '../errors'

@middleware()
export class AuthHospitalAdminMiddleware {
  constructor(private readonly service: HospitalProxy) {}

  async use(ctx: Context, next: Next): Promise<void> {
    const token = ctx.request.headers.authorization

    if (!token) throw new UnauthorizedError()

    const admin = await this.service.validateToken(token)

    if (!admin) throw new Error()

    ctx.state = admin
    next()
  }
}
