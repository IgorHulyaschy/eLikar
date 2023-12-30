import TelegramBot from 'node-telegram-bot-api';
export interface BotContext extends TelegramBot {
    msg: TelegramBot.Message;
}
export interface BotCBContext extends TelegramBot {
    cb: TelegramBot.CallbackQuery;
}
//# sourceMappingURL=BotContext.d.ts.map