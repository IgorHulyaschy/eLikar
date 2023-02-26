import { get, webController } from '@elikar/application'
import { Context } from 'koa'
import { NurseService } from './NurseService'

@webController('/nurse')
export class NurseWebController {
  constructor(private readonly service: NurseService) {}

  @get('/form/:email')
  async getRegistrationForm(ctx: Context): Promise<void> {
    ctx.body = this.service.getRegisterForm(ctx.request.params.email)
  }
}
