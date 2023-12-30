"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationBuilder = void 0;
require("reflect-metadata");
const koa_joi_router_1 = __importDefault(require("koa-joi-router"));
const decorators_1 = require("./decorators");
const middleware_1 = require("./decorators/middleware");
class ApplicationBuilder {
    buildHttpControllers(ioc) {
        return ioc.getWebControllers().map((ctor) => {
            const router = (0, koa_joi_router_1.default)();
            const controller = ioc.get(ctor);
            const controllerMetadata = (0, decorators_1.getWebControllersMetadata)(ctor);
            const handlersMetadata = (0, decorators_1.getHttpHandlersMetadata)(controller);
            const middlewaresMetadata = (0, middleware_1.getMiddlewaresMetadata)(controller);
            for (const metadata of handlersMetadata) {
                const middlewares = middlewaresMetadata
                    ? middlewaresMetadata.filter(({ handlerName }) => metadata.handlerName === handlerName)
                    : null;
                if (!middlewares?.length) {
                    router[metadata.httpMethod](controllerMetadata + metadata.path, controller[metadata.handlerName].bind(controller));
                    continue;
                }
                const [middeware, ...otherMiddlewares] = middlewares.map(({ constructor }) => {
                    const middleware = ioc.get(constructor);
                    return middleware.use.bind(middleware);
                });
                router[metadata.httpMethod](controllerMetadata + metadata.path, middeware, ...otherMiddlewares, controller[metadata.handlerName].bind(controller));
            }
            return router;
        });
    }
    buildMessageControllers(ioc) {
        const resolvedHandlers = ioc.getMessageControllers().map((ctorMessageController) => {
            const messageController = ioc.get(ctorMessageController);
            const messageHandlersMetadata = (0, decorators_1.getMessageHandlersMetadata)(messageController);
            return messageHandlersMetadata.map((messageHandlerMetadata) => {
                return {
                    queue: messageHandlerMetadata.queue,
                    handler: messageController[messageHandlerMetadata.handlerName].bind(messageController)
                };
            });
        });
        return resolvedHandlers.flat();
    }
    buildRpcController(ioc) {
        const queue = (0, decorators_1.getRpcControllerMetadata)(ioc.getRpcControllers()[0]);
        const rpcController = ioc.get(ioc.getRpcControllers()[0]);
        return {
            queue,
            rpcController
        };
    }
    buildBotController(ioc) {
        const controller = ioc.get(ioc.globalBotControllers[0]);
        const onTextMetadata = (0, decorators_1.getOnTextMetadata)(controller);
        const onMessageMetadata = (0, decorators_1.getOnMessageMetadata)(controller);
        const onCBQueryMetadata = (0, decorators_1.getOnCallbackQuery)(controller);
        return {
            controller,
            onTextMetadata,
            onMessageMetadata,
            onCBQueryMetadata
        };
    }
}
exports.ApplicationBuilder = ApplicationBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb25CdWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0FwcGxpY2F0aW9uQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0QkFBeUI7QUFFekIsb0VBQW1DO0FBSW5DLDZDQVFxQjtBQUNyQix3REFBZ0U7QUFFaEUsTUFBYSxrQkFBa0I7SUFDN0Isb0JBQW9CLENBQUMsR0FBc0I7UUFDekMsT0FBTyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMxQyxNQUFNLE1BQU0sR0FBRyxJQUFBLHdCQUFNLEdBQUUsQ0FBQTtZQUN2QixNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBRWhDLE1BQU0sa0JBQWtCLEdBQUcsSUFBQSxzQ0FBeUIsRUFBQyxJQUFJLENBQUMsQ0FBQTtZQUMxRCxNQUFNLGdCQUFnQixHQUFHLElBQUEsb0NBQXVCLEVBQUMsVUFBVSxDQUFDLENBQUE7WUFDNUQsTUFBTSxtQkFBbUIsR0FBRyxJQUFBLG1DQUFzQixFQUFDLFVBQVUsQ0FBQyxDQUFBO1lBRTlELEtBQUssTUFBTSxRQUFRLElBQUksZ0JBQWdCLEVBQUU7Z0JBQ3ZDLE1BQU0sV0FBVyxHQUFHLG1CQUFtQjtvQkFDckMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEtBQUssV0FBVyxDQUFDO29CQUN2RixDQUFDLENBQUMsSUFBSSxDQUFBO2dCQUVSLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFO29CQUN4QixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUN6QixrQkFBa0IsR0FBRyxRQUFRLENBQUMsSUFBSSxFQUNsQyxVQUFVLENBQUMsUUFBUSxDQUFDLFdBQXNDLENBQUMsQ0FB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