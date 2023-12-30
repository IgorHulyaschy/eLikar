import 'reflect-metadata';
import { Class } from 'type-fest';
import Router from 'koa-joi-router';
import { ApplicationModule } from '@elikar/module';
export declare class ApplicationBuilder {
    buildHttpControllers(ioc: ApplicationModule): Router.Router[];
    buildMessageControllers(ioc: ApplicationModule): Array<{
        queue: string;
        handler: (data: any) => Promise<any>;
    }>;
    buildRpcController(ioc: ApplicationModule): {
        queue: string;
        rpcController: Class<any>;
    };
    buildBotController(ioc: ApplicationModule): {
        controller: Class<any>;
        onTextMetadata: Array<{
            regExp: RegExp;
            methodName: string;
        }>;
        onMessageMetadata: Array<{
            message: string;
            methodName: string;
        }>;
        onCBQueryMetadata: string;
    };
}
//# sourceMappingURL=ApplicationBuilder.d.ts.map