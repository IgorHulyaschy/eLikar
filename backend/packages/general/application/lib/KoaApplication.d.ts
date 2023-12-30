import Koa from 'koa';
import { ApplicationModule } from '@elikar/module';
export declare abstract class KoaApplication extends Koa {
    private readonly port;
    private readonly applicationBuilder;
    private readonly logger;
    constructor({ port }: {
        port: number;
    });
    abstract init(): Promise<void>;
    start(ioc: ApplicationModule): Promise<void>;
    private initControllers;
}
//# sourceMappingURL=KoaApplication.d.ts.map