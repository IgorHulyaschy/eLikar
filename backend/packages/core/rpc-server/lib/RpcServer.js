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
exports.RpcServer = void 0;
const inversify_1 = require("inversify");
const amqp_1 = require("@elikar/amqp");
const rpc_error_codes_1 = require("@elikar/rpc-error-codes");
const als_1 = require("@elikar/als");
const logger_1 = require("@elikar/logger");
let RpcServer = class RpcServer {
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
        Object.defineProperty(this, "rpc", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "queueName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    async bootstrap() {
        await this.init();
        this.logger.info('Rpc server has bootstraped');
    }
    setQueue(queue) {
        this.queueName = queue;
    }
    setRpcController(rpcController) {
        this.rpc = rpcController;
    }
    async init() {
        this.amqp.channel.assertQueue(this.queueName, { durable: false });
        this.amqp.channel.prefetch(1);
        this.amqp.channel.consume(this.queueName, async (msg) => {
            if (!msg)
                return;
            als_1.Tracing.run(msg.properties.headers.traceId, async () => {
                this.logger.info(`Rpc call ${msg.properties.headers.method} - request`);
                const data = JSON.parse(msg.content.toString());
                let response;
                try {
                    response = await this.rpc[msg.properties.headers.method](data);
                }
                catch (err) {
                    if (err instanceof rpc_error_codes_1.RpcError) {
                        response = { code: err.code };
                    }
                    else {
                        response = { error: err };
                    }
                }
                this.amqp.channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ success: true, content: response ?? null })), {
                    headers: {
                        traceId: als_1.Tracing.getTrace()
                    }
                });
                this.logger.info(`Rpc call ${msg.properties.headers.method} - response`);
                this.amqp.channel.ack(msg);
            });
        });
    }
};
RpcServer = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [amqp_1.AmqpTransport, logger_1.Logger])
], RpcServer);
exports.RpcServer = RpcServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnBjU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1JwY1NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBc0M7QUFDdEMsdUNBQTRDO0FBQzVDLDZEQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsMkNBQXVDO0FBR2hDLElBQU0sU0FBUyxHQUFmLE1BQU0sU0FBUztJQUdwQixZQUE2QixJQUFtQixFQUFtQixNQUFjOzs7OzttQkFBcEQ7Ozs7OzttQkFBc0M7O1FBRm5FOzs7OztXQUFlO1FBQ2Y7Ozs7O1dBQWtCO0lBQ2tFLENBQUM7SUFFckYsS0FBSyxDQUFDLFNBQVM7UUFDYixNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO0lBQ2hELENBQUM7SUFFRCxRQUFRLENBQUMsS0FBYTtRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQTtJQUN4QixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsYUFBd0I7UUFDdkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUE7SUFDMUIsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtRQUNqRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ3RELElBQUksQ0FBQyxHQUFHO2dCQUFFLE9BQU07WUFDaEIsYUFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFpQixFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUMvRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQWdCLFlBQVksQ0FBQyxDQUFBO2dCQUNqRixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtnQkFDL0MsSUFBSSxRQUFRLENBQUE7Z0JBQ1osSUFBSTtvQkFDRixRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQStCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtpQkFDeEY7Z0JBQUMsT0FBTyxHQUFHLEVBQUU7b0JBQ1osSUFBSSxHQUFHLFlBQVksMEJBQVEsRUFBRTt3QkFDM0IsUUFBUSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtxQkFDOUI7eUJBQU07d0JBQ0wsUUFBUSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFBO3FCQUMxQjtpQkFDRjtnQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQzNCLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUN6RTtvQkFDRSxPQUFPLEVBQUU7d0JBQ1AsT0FBTyxFQUFFLGFBQU8sQ0FBQyxRQUFRLEVBQUU7cUJBQzVCO2lCQUNGLENBQ0YsQ0FBQTtnQkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQWdCLGFBQWEsQ0FBQyxDQUFBO2dCQUNsRixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDNUIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFBO0FBbERZLFNBQVM7SUFEckIsSUFBQSxzQkFBVSxHQUFFO3FDQUl3QixvQkFBYSxFQUEyQixlQUFNO0dBSHRFLFNBQVMsQ0FrRHJCO0FBbERZLDhCQUFTIn0=