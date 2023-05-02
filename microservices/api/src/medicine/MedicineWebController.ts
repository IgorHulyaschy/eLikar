import { get, post, useMiddleware, webController, Context } from '@elikar/application'
import { MedicineDto } from '@elikar/dto'

import { AuthHospitalAdminMiddleware } from '../auth/middlewares'
import { MedicineService } from './MedicineService'

@webController('/medicines')
export class MedicineWebController {
  constructor(private readonly service: MedicineService) {}

  @useMiddleware(AuthHospitalAdminMiddleware)
  @post('')
  async createMedicine(ctx: Context<MedicineDto.MedicineRegister>): Promise<void> {
    await this.service.create(ctx.request.body, ctx.state.id)
    ctx.status = 200
  }

  @useMiddleware(AuthHospitalAdminMiddleware)
  @get('')
  async getAll(ctx: Context): Promise<void> {
    ctx.status = 200
    ctx.body = await this.service.getAll(ctx.state.id)
  }
}
