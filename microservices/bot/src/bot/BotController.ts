import { injectable } from 'inversify'
import { onMessage, onText } from '@elikar/application'
import { BotContext } from '@elikar/bot-provider'

import { BotService } from './BotService'
import { CodeConfirmationError } from './errors'
import { MAIN_MENU } from './constants'

@injectable()
export class BotController {
  constructor(private readonly service: BotService) {}

  @onText(/\/start/)
  async onTelegramConnection(ctx: BotContext): Promise<void> {
    ctx.sendMessage(ctx.msg.chat.id, 'Write your email to connect with main account:')
  }

  // # TODO any chars emails
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
      await this.service.confirmConnection(ctx.msg.text!, String(ctx.msg.chat.id))
      ctx.sendMessage(ctx.msg.chat.id, 'Telegram connection is successful', MAIN_MENU)
    } catch (err) {
      if (err instanceof CodeConfirmationError) ctx.sendMessage(ctx.msg.chat.id, 'Wrong code')
    }
  }

  @onMessage('Keyboard')
  async sayHello(ctx: BotContext): Promise<void> {
    ctx.sendMessage(ctx.msg.chat.id, 'this.service.sayHello()')
  }
  // this.bot.onText(, (msg) => {
  //   if(!msg) return

  //   return this.bot.sendMessage(msg.chat.id, 'Hello')
  // })
  // this.onText(, (msg) => {
  //   const chatId = msg.chat.id

  //   this.sendMessage(chatId, "Welcome", Bot.MENU_OPTIONS);
  // })
  // this.on('message', (msg) => {
  //   this.sendMessage(msg.chat.id, msg.text!)
  // })
  // this.on('polling_error', (msg) => {
  //   console.log(msg)
  // })
  // bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  //   const action = callbackQuery.data
  //   const msg = callbackQuery.message
  //   const opts = {
  //     chat_id: msg!.chat.id,
  //     message_id: msg!.message_id
  //   }
  //   let text

  //   if (action === '1') {
  //     text = 'You hit button 1'
  //   }

  //   bot.editMessageText(text as any, opts)
  // })
}
// }
