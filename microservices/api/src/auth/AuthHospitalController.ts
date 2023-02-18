import { post, webController } from '@elikar/application'
import { Context } from 'koa'

import { HospitalService } from '../hospital'
import { WrongCredentials } from '../hospital/errors'

@webController('/auth')
export class AuthHospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @post('/sign-in')
  async signIn(ctx: Context): Promise<void> {
    try {
      ctx.body = await this.hospitalService.signIn(ctx.request.body)
    } catch (err) {
      if (err instanceof WrongCredentials) {
        ctx.body = { error: err.message }
        ctx.status = 400
        return
      }
      throw err
    }
  }
}
