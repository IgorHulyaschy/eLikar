import { Container } from 'inversify';
import 'reflect-metadata';
import { Class } from 'type-fest';
import { IModule } from '../interfaces';
export declare function module(module?: {
    imports?: IModule[];
    deps?: {
        services: (container: Container) => void;
        messageControllers?: Array<Class<any>>;
        rpcControllers?: Array<Class<any>>;
        webControllers?: Array<Class<any>>;
        botControllers?: Array<Class<any>>;
    };
}): ClassDecorator;
export declare function getModuleMetadata(target: any): {
    imports?: IModule[];
    deps?: {
        services: (container: Container) => void;
        messageControllers?: Array<Class<any>>;
        rpcControllers?: Array<Class<any>>;
        webControllers?: Array<Class<any>>;
        botControllers?: Array<Class<any>>;
    };
};
//# sourceMappingURL=module.d.ts.map