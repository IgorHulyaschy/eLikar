"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainApplication = void 0;
const logger_1 = require("@elikar/logger");
const inversify_1 = require("inversify");
const ApplicationBuilder_1 = require("./ApplicationBuilder");
let DomainApplication = class DomainApplication {
    constructor({ name, messageListener, rpcServer, botProvider }) {
        Object.defineProperty(this, "applicationBuilder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new ApplicationBuilder_1.ApplicationBuilder()
        });
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new logger_1.Logger()
        });
        Object.defineProperty(this, "domainName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "messageListener", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rpcServer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "botProvider", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.domainName = name;
        this.messageListener = messageListener;
        this.rpcServer = rpcServer;
    }
    async start(ioc) {
        this.initControllers(ioc);
        await this.init();
        this.logger.info(`${this.domainName.charAt(0).toUpperCase() + this.domainName.slice(1)} domain has started`);
    }
    initControllers(ioc) {
        if (this.messageListener) {
            const handlers = this.applicationBuilder.buildMessageControllers(ioc);
            handlers.forEach((handler) => this.messageListener.on(handler));
        }
        if (this.rpcServer) {
            const { queue, rpcController } = this.applicationBuilder.buildRpcController(ioc);
            this.rpcServer.setQueue(queue);
            this.rpcServer.setRpcController(rpcController);
        }
        if (this.botProvider) {
            const { controller, onTextMetadata, onMessageMetadata, onCBQueryMetadata } = this.applicationBuilder.buildBotController(ioc);
            this.botProvider.buildOnTextHandlers(onTextMetadata, controller);
            this.botProvider.buildOnMessageHandlers(onMessageMetadata, controller);
            this.botProvider.buildOnCallbackHandler(onCBQueryMetadata, controller);
        }
    }
};
DomainApplication = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [Object])
], DomainApplication);
exports.DomainApplication = DomainApplication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tYWluQXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRG9tYWluQXBwbGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXVDO0FBQ3ZDLHlDQUFzQztBQUl0Qyw2REFBeUQ7QUFLbEQsSUFBZSxpQkFBaUIsR0FBaEMsTUFBZSxpQkFBaUI7SUFPckMsWUFBWSxFQUNWLElBQUksRUFDSixlQUFlLEVBQ2YsU0FBUyxFQUNULFdBQVcsRUFNWjtRQWhCRDs7OzttQkFBc0MsSUFBSSx1Q0FBa0IsRUFBRTtXQUFBO1FBQzlEOzs7O21CQUEwQixJQUFJLGVBQU0sRUFBRTtXQUFBO1FBQ3RDOzs7OztXQUFtQztRQUNuQzs7Ozs7V0FBMEM7UUFDMUM7Ozs7O1dBQW1DO1FBQ25DOzs7OztXQUFrQztRQVloQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQTtRQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQTtRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtJQUM1QixDQUFDO0lBR0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFzQjtRQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3pCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBRWpCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNkLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUMzRixDQUFBO0lBQ0gsQ0FBQztJQUVPLGVBQWUsQ0FBQyxHQUFzQjtRQUM1QyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3JFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFnQixDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1NBQ2pFO1FBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLE1BQU0sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBRWhGLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUE7U0FDL0M7UUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsR0FDeEUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBRWpELElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFBO1lBQ2hFLElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLENBQUE7WUFDdEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsQ0FBQTtTQUN2RTtJQUNILENBQUM7Q0FDRixDQUFBO0FBdkRxQixpQkFBaUI7SUFEdEMsSUFBQSxzQkFBVSxHQUFFOztHQUNTLGlCQUFpQixDQXVEdEM7QUF2RHFCLDhDQUFpQiJ9