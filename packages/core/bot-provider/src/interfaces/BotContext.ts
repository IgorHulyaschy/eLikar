import TelegramBot from 'node-telegram-bot-api'

export interface BotContext extends TelegramBot {
  msg: TelegramBot.Message
}
