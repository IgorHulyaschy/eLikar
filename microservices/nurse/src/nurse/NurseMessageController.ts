import { messageController, messageHandler } from '@elikar/application'
import { NurseCreateCommand } from '@elikar/commands'
import { NurseService } from './NurseService'

@messageController()
export class NurseMessageController {
  constructor(private readonly service: NurseService) {}

  @messageHandler(NurseCreateCommand)
  create(cmd: NurseCreateCommand): Promise<void> {
    return this.service.create(cmd.payload)
  }
}
