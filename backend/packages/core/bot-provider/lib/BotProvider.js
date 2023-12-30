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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotProvider = void 0;
const inversify_1 = require("inversify");
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const logger_1 = require("@elikar/logger");
const constants_1 = require("./constants");
let BotProvider = class BotProvider extends node_telegram_bot_api_1.default {
    constructor({ token }, logger) {
        super(token, { polling: true });
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: logger
        });
    }
    async buildOnTextHandlers(onTextMetadata, controller) {
        onTextMetadata.forEach((metadata) => {
            this.onText(metadata.regExp, async (msg) => {
                if (!msg)
                    return this.logger.error('Catch request but has no message');
                this.logger.info(`Catch request from ${msg.chat.id}:${msg.chat.username}`);
                const that = this;
                that.msg = msg;
                await controller[metadata.methodName](that);
            });
        });
    }
    initOnMessageHandlers(metadata, controller) {
        return metadata.reduce((acc, handler) => {
            acc[handler.message] = async (data) => {
                await controller[handler.methodName](data);
            };
            return acc;
        }, {});
    }
    async buildOnMessageHandlers(metadata, controller) {
        const handlers = this.initOnMessageHandlers(metadata, controller);
        this.on('message', async (msg) => {
            if (!msg || !msg.text)
                return this.logger.error('Receive message but has no text');
            const that = this;
            that.msg = msg;
            if (handlers[msg.text]) {
                this.logger.info(`Receive message from ${msg.chat.id}:${msg.chat.username}`);
                await handlers[msg.text](that);
            }
        });
    }
    async buildOnCallbackHandler(metadata, controller) {
        this.on('callback_query', async (msg) => {
            if (!msg || !msg.data)
                return this.logger.error('Receive message but has no text');
            const that = this;
            that.cb = msg;
            await controller[metadata](that);
        });
    }
};
BotProvider = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(constants_1.TYPES.Options)),
    __metadata("design:paramtypes", [Object, logger_1.Logger])
], BotProvider);
exports.BotProvider = BotProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm90UHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQm90UHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQThDO0FBQzlDLGtGQUErQztBQUMvQywyQ0FBdUM7QUFHdkMsMkNBQW1DO0FBSTVCLElBQU0sV0FBVyxHQUFqQixNQUFNLFdBQVksU0FBUSwrQkFBVztJQUMxQyxZQUFtQyxFQUFFLEtBQUssRUFBVyxFQUFtQixNQUFjO1FBQ3BGLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTs7Ozs7bUJBRHVDOztJQUV4RSxDQUFDO0lBRUQsS0FBSyxDQUFDLG1CQUFtQixDQUN2QixjQUE2RCxFQUM3RCxVQUFlO1FBRWYsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxHQUFHO29CQUFFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQTtnQkFDdEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtnQkFFMUUsTUFBTSxJQUFJLEdBQUcsSUFBVyxDQUFBO2dCQUN4QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtnQkFDZCxNQUFNLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBcUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3hFLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRU8scUJBQXFCLENBQzNCLFFBQXdELEVBQ3hELFVBQXNCO1FBRXRCLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQWdELEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDbkYsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQ3BDLE1BQU0sVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFxQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdkUsQ0FBQyxDQUFBO1lBQ0QsT0FBTyxHQUFHLENBQUE7UUFDWixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDUixDQUFDO0lBRUQsS0FBSyxDQUFDLHNCQUFzQixDQUMxQixRQUF3RCxFQUN4RCxVQUFzQjtRQUV0QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFBO1FBQ2pFLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUMvQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUk7Z0JBQUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO1lBRWxGLE1BQU0sSUFBSSxHQUFHLElBQVcsQ0FBQTtZQUN4QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtZQUVkLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtnQkFDNUUsTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQy9CO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsS0FBSyxDQUFDLHNCQUFzQixDQUFDLFFBQWdCLEVBQUUsVUFBc0I7UUFDbkUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJO2dCQUFFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtZQUVsRixNQUFNLElBQUksR0FBRyxJQUFXLENBQUE7WUFDeEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUE7WUFDYixNQUFNLFVBQVUsQ0FBQyxRQUFtQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0QsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQTVEWSxXQUFXO0lBRHZCLElBQUEsc0JBQVUsR0FBRTtJQUVFLFdBQUEsSUFBQSxrQkFBTSxFQUFDLGlCQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7NkNBQThDLGVBQU07R0FEM0UsV0FBVyxDQTREdkI7QUE1RFksa0NBQVcifQ==