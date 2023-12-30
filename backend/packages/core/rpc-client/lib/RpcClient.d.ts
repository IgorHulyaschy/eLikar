import { AmqpTransport } from '@elikar/amqp';
import { Logger } from '@elikar/logger';
import { Class } from 'type-fest';
export declare class RpcClient {
    private readonly amqp;
    private readonly logger;
    constructor(amqp: AmqpTransport, logger: Logger);
    rpcCall(queueName: string, methodName: string, data: any): Promise<any>;
    getService<RpcSchema>(rpcSchema: Class<RpcSchema>): RpcSchema;
}
//# sourceMappingURL=RpcClient.d.ts.map