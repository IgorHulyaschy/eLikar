import TelegramBot from 'node-telegram-bot-api';
import { Logger } from '@elikar/logger';
import { Class } from 'type-fest';
import { Options } from './interfaces';
export declare class BotProvider extends TelegramBot {
    private readonly logger;
    constructor({ token }: Options, logger: Logger);
    buildOnTextHandlers(onTextMetadata: Array<{
        regExp: RegExp;
        methodName: string;
    }>, controller: any): Promise<void>;
    private initOnMessageHandlers;
    buildOnMessageHandlers(metadata: Array<{
        message: string;
        methodName: string;
    }>, controller: Class<any>): Promise<void>;
    buildOnCallbackHandler(metadata: string, controller: Class<any>): Promise<void>;
}
//# sourceMappingURL=BotProvider.d.ts.map