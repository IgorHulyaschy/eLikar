/* eslint-disable prettier/prettier */
import { injectable } from 'inversify'
import { onMessage, onText } from '@elikar/application'
import { BotContext } from '@elikar/bot-provider'
import { MAIN_MENU } from './constants'
import { BotService } from './BotService'

@injectable()
export class BotController {
  constructor(private readonly service: BotService) {}

  @onText(/\/start/)
  async sendHello(ctx: BotContext): Promise<void> {
    ctx.sendMessage(ctx.msg.chat.id, this.service.sendHello(), MAIN_MENU)
  }

  @onMessage('Keyboard')
  async sayHello(ctx: BotContext): Promise<void> {
    ctx.sendMessage(ctx.msg.chat.id, this.service.sayHello())
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
