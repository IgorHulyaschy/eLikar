import { WebController } from '@elikar/controller'
import { injectable } from 'inversify'
import { Context } from 'koa'
import { HospitalService } from '../hospital'
import { WrongCredentials } from '../hospital/errors'

@injectable()
export class AuthHospitalController extends WebController {
  constructor(private readonly hospitalService: HospitalService) {
    super()
    this.post('/sign-in', this.signIn)
  }

  signIn = async (ctx: Context): Promise<void> => {
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
