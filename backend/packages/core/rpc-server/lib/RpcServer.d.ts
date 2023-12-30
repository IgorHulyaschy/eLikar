import { AmqpTransport } from '@elikar/amqp';
import { Logger } from '@elikar/logger';
export declare class RpcServer<RpcSchema extends Record<string, (data: any) => Promise<any>>> {
    private readonly amqp;
    private readonly logger;
    rpc: RpcSchema;
    queueName: string;
    constructor(amqp: AmqpTransport, logger: Logger);
    bootstrap(): Promise<void>;
    setQueue(queue: string): void;
    setRpcController(rpcController: RpcSchema): void;
    init(): Promise<void>;
}
//# sourceMappingURL=RpcServer.d.ts.map