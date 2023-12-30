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
exports.MessageClient = void 0;
const inversify_1 = require("inversify");
const amqp_1 = require("@elikar/amqp");
const logger_1 = require("@elikar/logger");
const als_1 = require("@elikar/als");
let MessageClient = class MessageClient {
    constructor(amqp, logger) {
        Object.defineProperty(this, "amqp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: amqp
        });
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: logger
        });
    }
    emit(message) {
        this.amqp.channel.sendToQueue(message.constructor.name, Buffer.from(JSON.stringify(message)), {
            headers: {
                traceId: als_1.Tracing.getTrace(),
                messageName: message.constructor.name
            }
        });
        this.logger.info(`Emitted ${message.constructor.name}`);
    }
};
MessageClient = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [amqp_1.AmqpTransport, logger_1.Logger])
], MessageClient);
exports.MessageClient = MessageClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9NZXNzYWdlQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFzQztBQUN0Qyx1Q0FBNEM7QUFDNUMsMkNBQXVDO0FBQ3ZDLHFDQUFxQztBQUs5QixJQUFNLGFBQWEsR0FBbkIsTUFBTSxhQUFhO0lBQ3hCLFlBQTZCLElBQW1CLEVBQW1CLE1BQWM7Ozs7O21CQUFwRDs7Ozs7O21CQUFzQzs7SUFBaUIsQ0FBQztJQUVyRixJQUFJLENBQUMsT0FBcUI7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFO1lBQzVGLE9BQU8sRUFBRTtnQkFDUCxPQUFPLEVBQUUsYUFBTyxDQUFDLFFBQVEsRUFBRTtnQkFDM0IsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSTthQUN0QztTQUNGLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ3pELENBQUM7Q0FDRixDQUFBO0FBWlksYUFBYTtJQUR6QixJQUFBLHNCQUFVLEdBQUU7cUNBRXdCLG9CQUFhLEVBQTJCLGVBQU07R0FEdEUsYUFBYSxDQVl6QjtBQVpZLHNDQUFhIn0=