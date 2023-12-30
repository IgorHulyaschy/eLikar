import { Container, interfaces } from 'inversify';
import { Class } from 'type-fest';
import { IModule } from './interfaces';
export declare class ApplicationModule {
    private readonly appModule;
    mainContainer: Container;
    globalWebControllers: Array<Class<any>>;
    globalRpcControllers: Array<Class<any>>;
    globalMessageControllers: Array<Class<any>>;
    globalBotControllers: Array<Class<any>>;
    constructor(appModule: IModule);
    private defineControllers;
    init(): void;
    getMessageControllers(): Array<Class<any>>;
    getRpcControllers(): Array<Class<any>>;
    getWebControllers(): Array<Class<any>>;
    get<T>(servicesIdentifier: interfaces.ServiceIdentifier<T>): T;
    getContainer(): Container;
}
//# sourceMappingURL=ApplicationModule.d.ts.map