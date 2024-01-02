import { get, post, useMiddleware, webController } from '@elikar/application'
import { HTTPError } from '@elikar/middlewares'
import { Context } from 'koa'
import { AuthNurseMiddleware } from '../auth/middlewares'
import { ElectronicQueueService } from './ElectronicQueueService'

@webController('/electronic-queue')
export class ElectronicQueueWebController {
  constructor(private readonly service: ElectronicQueueService) {}

  @useMiddleware(AuthNurseMiddleware)
  @post('')
  async create(ctx: Context): Promise<void> {
    try {
      this.service.create({
        ...ctx.request.body,
        hospitalId: ctx.state.hospitalId,
        nurseId: ctx.state.id,
        dayOfMonth: new Date(ctx.request.body.dayOfMonth).getTime()
      })
      ctx.status = 200
    } catch (err) {
      throw new HTTPError({ status: 400, message: err.message })
    }
  }

  @useMiddleware(AuthNurseMiddleware)
  @get('/list')
  async getSlots(ctx: Context): Promise<void> {
    try {
      const res = await this.service.get({
        nurseId: ctx.state.id,
        hospitalId: ctx.state.hospitalId
      })
      ctx.body = {}
      ctx.status = 200
      console.log(ctx.body, ctx.status)
      // ctx.body = res
      ctx.body = res
      return
    } catch (err) {
      console.log(err)
    }
  }
}
