import { Context, get, post, useMiddleware, webController } from '@elikar/application'
import { PatientDto } from '@elikar/dto'
import { AuthHospitalAdminMiddleware } from '../auth/middlewares'
import { PatientService } from './PatientService'

@webController('/patients')
export class PatientWebController {
  constructor(private readonly service: PatientService) {}

  @useMiddleware(AuthHospitalAdminMiddleware)
  @post('')
  async create(ctx: Context<PatientDto.CreatePatient>): Promise<void> {
    ctx.body = {
      id: await this.service.create(ctx.request.body, ctx.state.id)
    }
    ctx.status = 200
  }

  @get('/:id')
  async get(ctx: Context<any>): Promise<void> {
    ctx.body = await this.service.get(ctx.request.params.id)
    ctx.status = 200
  }
}
