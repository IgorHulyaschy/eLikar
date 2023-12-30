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
exports.MessageListener = void 0;
const inversify_1 = require("inversify");
const amqp_1 = require("@elikar/amqp");
const logger_1 = require("@elikar/logger");
const als_1 = require("@elikar/als");
let MessageListener = class MessageListener {
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
        Object.defineProperty(this, "handlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    async subscribe(queue, cb) {
        await this.amqp.channel.assertQueue(queue);
        this.amqp.channel.consume(queue, async (msg) => {
            if (!msg)
                return;
            als_1.Tracing.run(msg.properties.headers.traceId, async () => {
                this.logger.info(`Consumed message ${msg.properties.headers.messageName}`);
                await cb(JSON.parse(msg.content.toString()));
                this.amqp.channel.ack(msg);
            });
        });
    }
    on(handler) {
        this.handlers.push(handler);
    }
    async bootstrap() {
        await Promise.all(this.handlers.map(({ queue, handler }) => this.subscribe(queue, handler)));
        this.logger.info('Amqp message listener has bootstraped');
    }
};
MessageListener = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [amqp_1.AmqpTransport, logger_1.Logger])
], MessageListener);
exports.MessageListener = MessageListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZUxpc3RlbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL01lc3NhZ2VMaXN0ZW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBc0M7QUFDdEMsdUNBQTRDO0FBQzVDLDJDQUF1QztBQUN2QyxxQ0FBcUM7QUFHOUIsSUFBZSxlQUFlLEdBQTlCLE1BQWUsZUFBZTtJQUduQyxZQUE2QixJQUFtQixFQUFtQixNQUFjOzs7OzttQkFBcEQ7Ozs7OzttQkFBc0M7O1FBRm5FOzs7O21CQUFnRixFQUFFO1dBQUE7SUFFRSxDQUFDO0lBRXJGLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBYSxFQUFFLEVBQW9DO1FBQ2pFLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRTFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzdDLElBQUksQ0FBQyxHQUFHO2dCQUFFLE9BQU07WUFFaEIsYUFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFpQixFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUMvRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBcUIsRUFBRSxDQUFDLENBQUE7Z0JBQ3BGLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7Z0JBRTVDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUM1QixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELEVBQUUsQ0FBQyxPQUErRDtRQUNoRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM3QixDQUFDO0lBRUQsS0FBSyxDQUFDLFNBQVM7UUFDYixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzVGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHVDQUF1QyxDQUFDLENBQUE7SUFDM0QsQ0FBQztDQUNGLENBQUE7QUE1QnFCLGVBQWU7SUFEcEMsSUFBQSxzQkFBVSxHQUFFO3FDQUl3QixvQkFBYSxFQUEyQixlQUFNO0dBSDdELGVBQWUsQ0E0QnBDO0FBNUJxQiwwQ0FBZSJ9