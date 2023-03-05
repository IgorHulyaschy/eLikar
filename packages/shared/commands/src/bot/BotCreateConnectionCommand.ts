import { BotDto } from '@elikar/dto'
import { Command } from '@elikar/message-client'

export class BotCreateConnectionCommand extends Command<BotDto.Bot> {}
