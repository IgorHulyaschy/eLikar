import { post, useMiddleware, webController } from '@elikar/application'
import { Context } from 'koa'

import { AuthHospitalAdminMiddleware } from '../auth/middlewares'
import { MedicineService } from './MedicineService'

@webController('/medicines')
export class MedicineWebController {
  constructor(private readonly service: MedicineService) {}

  @useMiddleware(AuthHospitalAdminMiddleware)
  @post('')
  async createMedicine(ctx: Context): Promise<void> {
    await this.service.create(ctx.request.body)
    ctx.status = 200
  }
}
