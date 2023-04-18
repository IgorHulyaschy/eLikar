import { Context } from 'koa'
import { post, webController, get, useMiddleware } from '@elikar/application'
import { HTTPError } from '@elikar/middlewares'

import { AlreadyExistsError } from '../proxy/errors'
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
      if (err instanceof AlreadyExistsError)
        throw new HTTPError({ status: 400, message: err.message })
      throw err
    }
  }

  @useMiddleware(AuthHospitalAdminMiddleware)
  @get('/me')
  async getMe(ctx: Context): Promise<void> {
    ctx.body = ctx.state
  }

  @useMiddleware(AuthHospitalAdminMiddleware)
  @post('/registration-letters')
  async sendLetters(ctx: Context): Promise<void> {
    this.service.sendRegistrationLettersForNurses(ctx.request.body.emails, ctx.state.id)
    ctx.body = { success: true }
  }
}
