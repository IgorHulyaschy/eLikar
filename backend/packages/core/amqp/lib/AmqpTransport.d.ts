import { Logger } from '@elikar/logger';
import amqplib from 'amqplib';
import * as interfaces from './interfaces';
export declare class AmqpTransport {
    private readonly config;
    private readonly logger;
    channel: amqplib.Channel;
    constructor(config: interfaces.Options, logger: Logger);
    bootstrap(): Promise<void>;
}
//# sourceMappingURL=AmqpTransport.d.ts.map