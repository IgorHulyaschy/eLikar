import { Context } from 'koa'
import { post, webController, get, useMiddleware } from '@elikar/application'

import { AlreadyExistsError } from './errors'
import { HospitalService } from './HospitalService'
import { AuthHospitalAdminMiddleware } from '../auth/middlewares'

@webController('/hospital')
export class HospitalWebController {
  constructor(private readonly service: HospitalService) {}

  @post('')
  async create(ctx: Context): Promise<void> {
    try {
      await this.service.create(ctx.request.body)
      ctx.status = 200
    } catch (err) {
      if (err instanceof AlreadyExistsError) {
        ctx.body = { error: err.message }
        ctx.status = 400
        return
      }
      throw err
    }
  }

  @useMiddleware(AuthHospitalAdminMiddleware)
  @get('/me')
  async getMe(ctx: Context): Promise<void> {
    ctx.body = ctx.state
  }
}
