import { injectable } from 'inversify'
import { onMessage, onText } from '@elikar/application'
import { BotContext } from '@elikar/bot-provider'

import { BotService } from './BotService'
import { CodeConfirmationError } from './errors'
import { MAIN_MENU } from './constants'
import { NurseTelegramConnectCommand } from '@elikar/commands'
import { MessageClient } from '@elikar/message-client'

@injectable()
export class BotController {
  constructor(
    private readonly service: BotService,
    private readonly messageClient: MessageClient
  ) {}

  @onText(/\/start/)
  async onTelegramConnection(ctx: BotContext): Promise<void> {
    ctx.sendMessage(ctx.msg.chat.id, 'Write your email to connect with main account:')
  }

  // #TODO any chars emails
  @onText(/([A-Za-z])@([A-Za-z]).([A-Za-z])/)
  async onEmailReceived(ctx: BotContext): Promise<void> {
    await this.service.sendConfirmationLetter(ctx.msg.text!, String(ctx.msg.chat.id))
    ctx.sendMessage(
      ctx.msg.chat.id,
      'Check your confirmation code that your received on email and write it here'
    )
  }

  @onText(/([1-9]{6})/)
  async onCodeConfirmation(ctx: BotContext): Promise<void> {
    try {
      const dto = await this.service.confirmConnection(ctx.msg.text!, String(ctx.msg.chat.id))
      this.messageClient.emit(new NurseTelegramConnectCommand(dto))
      ctx.sendMessage(ctx.msg.chat.id, 'Telegram connection is successful', MAIN_MENU)
    } catch (err) {
      if (err instanceof CodeConfirmationError) ctx.sendMessage(ctx.msg.chat.id, 'Wrong code')
    }
  }

  @onMessage('My account')
  async sayHello(ctx: BotContext): Promise<void> {
    const data = await this.service.getMe(String(ctx.msg.chat.id))
    ctx.sendMessage(ctx.msg.chat.id, JSON.stringify(data), MAIN_MENU)
  }
}
