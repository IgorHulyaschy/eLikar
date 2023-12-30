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
exports.RpcClient = void 0;
/* eslint-disable new-cap */
const amqp_1 = require("@elikar/amqp");
const logger_1 = require("@elikar/logger");
const inversify_1 = require("inversify");
const als_1 = require("@elikar/als");
const rpc_error_codes_1 = require("@elikar/rpc-error-codes");
let RpcClient = class RpcClient {
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
    async rpcCall(queueName, methodName, data) {
        const queue = await this.amqp.channel.assertQueue('', { exclusive: true });
        const promise = new Promise((resolve, reject) => {
            this.amqp.channel.consume(queue.queue, async (msg) => {
                if (!msg)
                    return;
                als_1.Tracing.run(msg.properties.headers.traceId, () => {
                    // setTimeout(() => reject, 10 * 1000) // reject after no response
                    const response = JSON.parse(msg.content.toString()).content;
                    if (response && response.code) {
                        this.logger.info(`Rpc call to ${queueName + '.' + methodName} - failed with status-code: ${response.code}`);
                        reject(new rpc_error_codes_1.RpcError(response.code));
                        return;
                    }
                    if (response && response.error) {
                        reject(response.error);
                        return;
                    }
                    this.logger.info(`Rpc call to ${queueName + '.' + methodName} - success`);
                    resolve(response);
                });
            }, { noAck: true });
        });
        this.logger.info(`Rpc call to ${queueName + '.' + methodName} - pending`);
        this.amqp.channel.sendToQueue(queueName, Buffer.from(data ? JSON.stringify(data) : JSON.stringify({ noContent: true })), {
            replyTo: queue.queue,
            headers: {
                method: methodName,
                traceId: als_1.Tracing.getTrace()
            }
        });
        return promise;
    }
    getService(rpcSchema) {
        let queueName;
        return Object.entries(new rpcSchema()).reduce((acc, [name, value]) => {
            if (name === 'queueName') {
                acc[name] = value;
                queueName = value;
            }
            else
                acc[name] = async (data) => this.rpcCall(queueName, name, data);
            return acc;
        }, {});
    }
};
RpcClient = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [amqp_1.AmqpTransport, logger_1.Logger])
], RpcClient);
exports.RpcClient = RpcClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnBjQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1JwY0NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0QkFBNEI7QUFDNUIsdUNBQTRDO0FBQzVDLDJDQUF1QztBQUN2Qyx5Q0FBc0M7QUFFdEMscUNBQXFDO0FBQ3JDLDZEQUFrRDtBQUczQyxJQUFNLFNBQVMsR0FBZixNQUFNLFNBQVM7SUFDcEIsWUFBNkIsSUFBbUIsRUFBbUIsTUFBYzs7Ozs7bUJBQXBEOzs7Ozs7bUJBQXNDOztJQUFpQixDQUFDO0lBRXJGLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBaUIsRUFBRSxVQUFrQixFQUFFLElBQVM7UUFDNUQsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFFMUUsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUN2QixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDWixJQUFJLENBQUMsR0FBRztvQkFBRSxPQUFNO2dCQUVoQixhQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQWlCLEVBQUUsR0FBRyxFQUFFO29CQUN6RCxrRUFBa0U7b0JBRWxFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtvQkFFM0QsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTt3QkFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2QsZUFBZSxTQUFTLEdBQUcsR0FBRyxHQUFHLFVBQVUsK0JBQ3pDLFFBQVEsQ0FBQyxJQUNYLEVBQUUsQ0FDSCxDQUFBO3dCQUNELE1BQU0sQ0FBQyxJQUFJLDBCQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7d0JBQ25DLE9BQU07cUJBQ1A7b0JBQ0QsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTt3QkFDOUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTt3QkFDdEIsT0FBTTtxQkFDUDtvQkFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLFNBQVMsR0FBRyxHQUFHLEdBQUcsVUFBVSxZQUFZLENBQUMsQ0FBQTtvQkFDekUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUNuQixDQUFDLENBQUMsQ0FBQTtZQUNKLENBQUMsRUFDRCxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FDaEIsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxTQUFTLEdBQUcsR0FBRyxHQUFHLFVBQVUsWUFBWSxDQUFDLENBQUE7UUFDekUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUMzQixTQUFTLEVBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUM5RTtZQUNFLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FBSztZQUNwQixPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLFVBQVU7Z0JBQ2xCLE9BQU8sRUFBRSxhQUFPLENBQUMsUUFBUSxFQUFFO2FBQzVCO1NBQ0YsQ0FDRixDQUFBO1FBQ0QsT0FBTyxPQUFPLENBQUE7SUFDaEIsQ0FBQztJQUVELFVBQVUsQ0FBWSxTQUEyQjtRQUMvQyxJQUFJLFNBQWlCLENBQUE7UUFDckIsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksU0FBUyxFQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtZQUNsRixJQUFJLElBQUksS0FBSyxXQUFXLEVBQUU7Z0JBQ3hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUE7Z0JBQ2pCLFNBQVMsR0FBRyxLQUFLLENBQUE7YUFDbEI7O2dCQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDM0UsT0FBTyxHQUFHLENBQUE7UUFDWixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDUixDQUFDO0NBQ0YsQ0FBQTtBQS9EWSxTQUFTO0lBRHJCLElBQUEsc0JBQVUsR0FBRTtxQ0FFd0Isb0JBQWEsRUFBMkIsZUFBTTtHQUR0RSxTQUFTLENBK0RyQjtBQS9EWSw4QkFBUyJ9