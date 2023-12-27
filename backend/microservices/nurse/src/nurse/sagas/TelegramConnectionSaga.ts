import { messageController, messageHandler } from '@elikar/application'
import { BotCreateConnectionCommand, NurseTelegramConnectCommand } from '@elikar/commands'
import { MessageClient } from '@elikar/message-client'
import { NurseService } from '../NurseService'

@messageController()
export class TelegramConnectionSaga {
  constructor(
    private readonly messageClient: MessageClient,
    private readonly service: NurseService
  ) {}

  @messageHandler(NurseTelegramConnectCommand)
  async onTelegramConnect({ payload }: NurseTelegramConnectCommand): Promise<void> {
    const dto = await this.service.setTelegramConnection(payload)
    if (dto) return this.messageClient.emit(new BotCreateConnectionCommand(dto))
  }
}
