import { get, post, useMiddleware, webController } from '@elikar/application'
import { HTTPError } from '@elikar/middlewares'
import { Context } from 'koa'
import { AuthNurseMiddleware } from '../auth/middlewares'
import { AlreadyExistsError } from '../proxy/errors'
import { NurseService } from './NurseService'

@webController('/nurses')
export class NurseWebController {
  constructor(private readonly service: NurseService) {}

  @get('/form/:email/:hospitalId')
  async getRegistrationForm(ctx: Context): Promise<void> {
    ctx.body = this.service.getRegisterForm(ctx.request.params.email, ctx.request.params.hospitalId)
  }

  @post('')
  async signUp(ctx: Context): Promise<void> {
    try {
      await this.service.signUp(ctx.request.body)
      ctx.status = 200
    } catch (err) {
      if (err instanceof AlreadyExistsError)
        throw new HTTPError({ status: 400, message: err.message })
      throw err
    }
  }

  @useMiddleware(AuthNurseMiddleware)
  @get('/me')
  async getMe(ctx: Context): Promise<void> {
    ctx.body = ctx.state
  }

  @get('')
  async getList(ctx: Context): Promise<void> {
    ctx.body = await this.service.getList()
    ctx.status = 200
  }
}
