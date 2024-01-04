import { messageController, messageHandler } from '@elikar/application'
import { PatientCreateCommand } from '@elikar/commands'
import { PatientService } from './PatientService'
import { PatientDto } from '@elikar/dto'

@messageController()
export class PatientMessageController {
  constructor(private readonly service: PatientService) {}

  @messageHandler(PatientCreateCommand)
  onCreate(cmd: PatientCreateCommand): Promise<PatientDto.Patient> {
    return this.service.create(cmd.payload)
  }
}
