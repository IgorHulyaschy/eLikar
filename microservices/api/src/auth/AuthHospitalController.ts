import { post, webController } from '@elikar/application'
import { HTTPError } from '@elikar/middlewares'
import { Context } from 'koa'

import { HospitalService } from '../hospital'
import { WrongCredentials } from '../proxy/errors'

@webController('/auth')
export class AuthHospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @post('/sign-in')
  async signIn(ctx: Context): Promise<void> {
    try {
      ctx.body = await this.hospitalService.signIn(ctx.request.body)
    } catch (err) {
      if (err instanceof WrongCredentials)
        throw new HTTPError({ status: 400, message: err.message })
      throw err
    }
  }
}
