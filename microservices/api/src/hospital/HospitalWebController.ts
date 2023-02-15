import { WebController } from '@elikar/controller'
import { injectable } from 'inversify'
import { Context } from 'koa'

import { AlreadyExistsError } from './errors'
import { HospitalService } from './HospitalService'

@injectable()
export class HospitalWebController extends WebController {
  constructor(private readonly service: HospitalService) {
    super()
    this.post('/', this.create)
  }

  create = async (ctx: Context): Promise<void> => {
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
}
