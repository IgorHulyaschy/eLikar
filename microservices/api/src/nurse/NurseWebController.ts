import { get, post, webController } from '@elikar/application'
import { HTTPError } from '@elikar/middlewares'
import { Context } from 'koa'
import { AlreadyExistsError } from '../proxy/errors'
import { NurseService } from './NurseService'

@webController('/nurse')
export class NurseWebController {
  constructor(private readonly service: NurseService) {}

  @get('/form/:email/:hospitalId')
  async getRegistrationForm(ctx: Context): Promise<void> {
    ctx.body = this.service.getRegisterForm(ctx.request.params.email, ctx.request.params.hospitalId)
  }

  @post('')
  async signUp(ctx: Context): Promise<void> {
    try {
      await this.service.signUp(JSON.parse(ctx.request.body))
      ctx.status = 200
    } catch (err) {
      if (err instanceof AlreadyExistsError)
        throw new HTTPError({ status: 400, message: err.message })
      throw err
    }
  }
}
