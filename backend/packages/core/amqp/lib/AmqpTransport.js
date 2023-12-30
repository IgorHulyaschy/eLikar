"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.AmqpTransport = void 0;
const inversify_1 = require("inversify");
const logger_1 = require("@elikar/logger");
const amqplib_1 = __importDefault(require("amqplib"));
const interfaces = __importStar(require("./interfaces"));
const constants_1 = require("./constants");
let AmqpTransport = class AmqpTransport {
    constructor(config, logger) {
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: config
        });
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: logger
        });
        Object.defineProperty(this, "channel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    async bootstrap() {
        this.channel = await amqplib_1.default.connect(this.config.url).then((conn) => conn.createChannel());
        this.logger.info('Amqp server has bootstraped');
    }
};
AmqpTransport = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(constants_1.TYPES.Options)),
    __metadata("design:paramtypes", [Object, logger_1.Logger])
], AmqpTransport);
exports.AmqpTransport = AmqpTransport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW1xcFRyYW5zcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BbXFwVHJhbnNwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQThDO0FBQzlDLDJDQUF1QztBQUN2QyxzREFBNkI7QUFFN0IseURBQTBDO0FBQzFDLDJDQUFtQztBQUc1QixJQUFNLGFBQWEsR0FBbkIsTUFBTSxhQUFhO0lBRXhCLFlBQzBDLE1BQTBCLEVBQ2pELE1BQWM7Ozs7O21CQURTOzs7Ozs7bUJBQ3ZCOztRQUhuQjs7Ozs7V0FBeUI7SUFJdEIsQ0FBQztJQUVKLEtBQUssQ0FBQyxTQUFTO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLGlCQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQTtRQUMxRixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO0lBQ2pELENBQUM7Q0FDRixDQUFBO0FBWFksYUFBYTtJQUR6QixJQUFBLHNCQUFVLEdBQUU7SUFJUixXQUFBLElBQUEsa0JBQU0sRUFBQyxpQkFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBOzZDQUNHLGVBQU07R0FKdEIsYUFBYSxDQVd6QjtBQVhZLHNDQUFhIn0=