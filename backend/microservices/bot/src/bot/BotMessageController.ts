import { messageController, messageHandler } from '@elikar/application'
import { BotCreateConnectionCommand } from '@elikar/commands'
import { BotService } from './BotService'

@messageController()
export class BotMessageController {
  constructor(private readonly botService: BotService) {}

  @messageHandler(BotCreateConnectionCommand)
  async onCreate(cmd: BotCreateConnectionCommand): Promise<void> {
    return this.botService.create(cmd.payload)
  }
}
