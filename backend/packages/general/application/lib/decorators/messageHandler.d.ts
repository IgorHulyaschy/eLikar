import { Class } from 'type-fest';
import { Command } from '@elikar/message-client';
export declare function messageHandler<T extends Command<T['payload']>>(command: Class<Command<T['payload']>>): MethodDecorator;
export declare function getMessageHandlersMetadata(target: any): Array<{
    queue: string;
    handlerName: string;
}>;
//# sourceMappingURL=messageHandler.d.ts.map