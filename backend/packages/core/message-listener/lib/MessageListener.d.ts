import { AmqpTransport } from '@elikar/amqp';
import { Logger } from '@elikar/logger';
export declare abstract class MessageListener {
    private readonly amqp;
    private readonly logger;
    handlers: Array<{
        queue: string;
        handler: (any: any) => any | Promise<any>;
    }>;
    constructor(amqp: AmqpTransport, logger: Logger);
    subscribe(queue: string, cb: (any: any) => any | Promise<any>): Promise<void>;
    on(handler: {
        queue: string;
        handler: (any: any) => Promise<any>;
    }): void;
    bootstrap(): Promise<void>;
}
//# sourceMappingURL=MessageListener.d.ts.map