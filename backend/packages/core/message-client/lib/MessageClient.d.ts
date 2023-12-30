import { AmqpTransport } from '@elikar/amqp';
import { Logger } from '@elikar/logger';
import { Command } from './Command';
export declare class MessageClient {
    private readonly amqp;
    private readonly logger;
    constructor(amqp: AmqpTransport, logger: Logger);
    emit(message: Command<any>): void;
}
//# sourceMappingURL=MessageClient.d.ts.map