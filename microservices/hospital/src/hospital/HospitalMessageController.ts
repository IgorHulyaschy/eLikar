import { HospitalCreateCommand } from '@elikar/commands'

import { HospitalService } from './HospitalService'
import { messageController, messageHandler } from '@elikar/application'

@messageController()
export class HospitalMessageController {
  constructor(private readonly service: HospitalService) {}

  @messageHandler(HospitalCreateCommand)
  async create(cmd: HospitalCreateCommand): Promise<void> {
    return this.service.create(cmd.payload)
  }
}
