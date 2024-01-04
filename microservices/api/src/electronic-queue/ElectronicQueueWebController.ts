import { get, post, put, useMiddleware, webController } from '@elikar/application'
import { HTTPError } from '@elikar/middlewares'
import { Context } from 'koa'
import { AuthHospitalAdminMiddleware, AuthNurseMiddleware } from '../auth/middlewares'
import { ElectronicQueueService } from './ElectronicQueueService'

@webController('/electronic-queue')
export class ElectronicQueueWebController {
  constructor(private readonly service: ElectronicQueueService) {}

  @useMiddleware(AuthHospitalAdminMiddleware)
  @post('')
  async create(ctx: Context): Promise<void> {
    try {
      this.service.create({
        ...ctx.request.body,
        hospitalId: ctx.state.id,
        dayOfMonth: new Date(ctx.request.body.dayOfMonth).getTime()
      })
      ctx.status = 200
    } catch (err) {
      throw new HTTPError({ status: 400, message: err.message })
    }
  }

  @useMiddleware(AuthNurseMiddleware)
  @get('/:nurseId')
  async getSlots(ctx: Context): Promise<void> {
    const res = await this.service.get({
      nurseId: ctx.request.params.nurseId,
      hospitalId: ctx.state.hospitalId
    })
    ctx.body = res
  }

  @useMiddleware(AuthNurseMiddleware)
  @put('/:id')
  async setDone(ctx: Context): Promise<void> {
    await this.service.startOverview(ctx.request.params.id)
    ctx.status = 200
    ctx.body = { success: true }
  }
}
