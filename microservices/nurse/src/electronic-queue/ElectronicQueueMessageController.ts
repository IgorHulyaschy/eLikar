import { messageController, messageHandler } from '@elikar/application'
import { ElectronicQueueCreateCommand } from '@elikar/commands'
import { ElectronicQueueService } from './ElectronicQueueService'

@messageController()
export class ElectronicQueueMessageController {
  constructor(private readonly service: ElectronicQueueService) {}

  @messageHandler(ElectronicQueueCreateCommand)
  onCreate(cmd: ElectronicQueueCreateCommand): Promise<void> {
    return this.service.create(cmd.payload)
  }
}
