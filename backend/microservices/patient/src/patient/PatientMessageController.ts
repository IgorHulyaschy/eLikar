import { messageController, messageHandler } from '@elikar/application'
import { PatientCreateCommand } from '@elikar/commands'
import { PatientService } from './PatientService'

@messageController()
export class PatientMessageController {
  constructor(private readonly service: PatientService) {}

  @messageHandler(PatientCreateCommand)
  onCreate(cmd: PatientCreateCommand): Promise<void> {
    return this.service.create(cmd.payload)
  }
}
