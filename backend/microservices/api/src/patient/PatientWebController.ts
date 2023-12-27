import { Context, post, useMiddleware, webController } from '@elikar/application'
import { PatientDto } from '@elikar/dto'
import { AuthHospitalAdminMiddleware } from '../auth/middlewares'
import { PatientService } from './PatientService'

@webController('/patients')
export class PatientWebController {
  constructor(private readonly service: PatientService) {}

  @useMiddleware(AuthHospitalAdminMiddleware)
  @post('')
  async create(ctx: Context<PatientDto.CreatePatient>): Promise<void> {
    await this.service.create(ctx.request.body, ctx.state.id)
    ctx.status = 200
  }
}
