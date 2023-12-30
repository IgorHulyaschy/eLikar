import { MessageListener } from '@elikar/message-listener';
import { RpcServer } from '@elikar/rpc-server';
import { ApplicationModule } from '@elikar/module';
import { BotProvider } from '@elikar/bot-provider';
export declare abstract class DomainApplication {
    private readonly applicationBuilder;
    private readonly logger;
    private readonly domainName;
    readonly messageListener?: MessageListener;
    readonly rpcServer?: RpcServer<any>;
    readonly botProvider?: BotProvider;
    constructor({ name, messageListener, rpcServer, botProvider }: {
        name: string;
        readonly messageListener?: MessageListener;
        readonly rpcServer?: RpcServer<any>;
        readonly botProvider?: BotProvider;
    });
    abstract init(): Promise<void>;
    start(ioc: ApplicationModule): Promise<void>;
    private initControllers;
}
//# sourceMappingURL=DomainApplication.d.ts.map