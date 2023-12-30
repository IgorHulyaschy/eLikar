"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModule = void 0;
const inversify_1 = require("inversify");
const decorators_1 = require("./decorators");
class ApplicationModule {
    constructor(appModule) {
        Object.defineProperty(this, "appModule", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: appModule
        });
        Object.defineProperty(this, "mainContainer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new inversify_1.Container()
        });
        Object.defineProperty(this, "globalWebControllers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "globalRpcControllers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "globalMessageControllers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "globalBotControllers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    defineControllers(ctor) {
        if (ctor.deps) {
            if (ctor.deps.messageControllers) {
                ctor.deps.messageControllers.forEach((controller) => {
                    this.mainContainer.bind(controller).toSelf().inSingletonScope();
                    this.globalMessageControllers.push(controller);
                });
            }
            if (ctor.deps.rpcControllers) {
                ctor.deps.rpcControllers.forEach((controller) => {
                    this.mainContainer.bind(controller).toSelf().inSingletonScope();
                    this.globalRpcControllers.push(controller);
                });
            }
            if (ctor.deps.webControllers) {
                ctor.deps.webControllers.forEach((controller) => {
                    this.mainContainer.bind(controller).toSelf().inSingletonScope();
                    this.globalWebControllers.push(controller);
                });
            }
            if (ctor.deps.botControllers) {
                ctor.deps.botControllers.forEach((controller) => {
                    this.mainContainer.bind(controller).toSelf().inSingletonScope();
                    this.globalBotControllers.push(controller);
                });
            }
            ctor.deps.services(this.mainContainer);
        }
    }
    init() {
        const { imports, deps } = this.appModule;
        if (imports) {
            imports.forEach((module) => {
                const moduleMetadata = (0, decorators_1.getModuleMetadata)(module);
                if (!moduleMetadata && 'deps' in module)
                    return this.defineControllers(module);
                return this.defineControllers(moduleMetadata);
            });
        }
        if (deps) {
            deps.services(this.mainContainer);
        }
    }
    getMessageControllers() {
        return this.globalMessageControllers;
    }
    getRpcControllers() {
        return this.globalRpcControllers;
    }
    getWebControllers() {
        return this.globalWebControllers;
    }
    get(servicesIdentifier) {
        return this.mainContainer.get(servicesIdentifier);
    }
    getContainer() {
        return this.mainContainer;
    }
}
exports.ApplicationModule = ApplicationModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb25Nb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQXBwbGljYXRpb25Nb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUNBQWlEO0FBRWpELDZDQUFnRDtBQUdoRCxNQUFhLGlCQUFpQjtJQU01QixZQUE2QixTQUFrQjs7Ozs7bUJBQWxCOztRQUw3Qjs7OzttQkFBZ0IsSUFBSSxxQkFBUyxFQUFFO1dBQUE7UUFDL0I7Ozs7bUJBQTBDLEVBQUU7V0FBQTtRQUM1Qzs7OzttQkFBMEMsRUFBRTtXQUFBO1FBQzVDOzs7O21CQUE4QyxFQUFFO1dBQUE7UUFDaEQ7Ozs7bUJBQTBDLEVBQUU7V0FBQTtJQUNNLENBQUM7SUFFM0MsaUJBQWlCLENBQUMsSUFBYTtRQUNyQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7b0JBQ2xELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUE7b0JBQy9ELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7Z0JBQ2hELENBQUMsQ0FBQyxDQUFBO2FBQ0g7WUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtvQkFDOUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtvQkFDL0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtnQkFDNUMsQ0FBQyxDQUFDLENBQUE7YUFDSDtZQUNELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO29CQUM5QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO29CQUMvRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO2dCQUM1QyxDQUFDLENBQUMsQ0FBQTthQUNIO1lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7b0JBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUE7b0JBQy9ELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7Z0JBQzVDLENBQUMsQ0FBQyxDQUFBO2FBQ0g7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7U0FDdkM7SUFDSCxDQUFDO0lBRUQsSUFBSTtRQUNGLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQTtRQUN4QyxJQUFJLE9BQU8sRUFBRTtZQUNYLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDekIsTUFBTSxjQUFjLEdBQUcsSUFBQSw4QkFBaUIsRUFBQyxNQUFNLENBQUMsQ0FBQTtnQkFDaEQsSUFBSSxDQUFDLGNBQWMsSUFBSSxNQUFNLElBQUksTUFBTTtvQkFBRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFFOUUsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUE7WUFDL0MsQ0FBQyxDQUFDLENBQUE7U0FDSDtRQUVELElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7U0FDbEM7SUFDSCxDQUFDO0lBRUQscUJBQXFCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFBO0lBQ3RDLENBQUM7SUFFRCxpQkFBaUI7UUFDZixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQTtJQUNsQyxDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUE7SUFDbEMsQ0FBQztJQUVELEdBQUcsQ0FBSSxrQkFBbUQ7UUFDeEQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBQ25ELENBQUM7SUFFRCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFBO0lBQzNCLENBQUM7Q0FDRjtBQXpFRCw4Q0F5RUMifQ==