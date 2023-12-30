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
exports.JWTService = void 0;
/* eslint-disable @typescript-eslint/no-invalid-void-type */
const inversify_1 = require("inversify");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("@elikar/logger");
const contants_1 = require("./contants");
const errors_1 = require("./errors");
let JWTService = class JWTService {
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
    }
    sign(payload, options) {
        return jsonwebtoken_1.default.sign(payload, this.config.secret, options);
    }
    async verify(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.config.secret);
        }
        catch (err) {
            if (err.message.includes('jwt expired')) {
                throw new errors_1.TokenExpiredError();
            }
            this.logger.error('wrong-secret');
            return null;
        }
    }
};
JWTService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(contants_1.TYPES.Options)),
    __metadata("design:paramtypes", [Object, logger_1.Logger])
], JWTService);
exports.JWTService = JWTService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSldUU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9KV1RTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDREQUE0RDtBQUM1RCx5Q0FBOEM7QUFDOUMsZ0VBQThDO0FBQzlDLDJDQUF1QztBQUV2Qyx5Q0FBa0M7QUFFbEMscUNBQTRDO0FBR3JDLElBQU0sVUFBVSxHQUFoQixNQUFNLFVBQVU7SUFDckIsWUFDMEMsTUFBZSxFQUN0QyxNQUFjOzs7OzttQkFEUzs7Ozs7O21CQUN2Qjs7SUFDaEIsQ0FBQztJQUVKLElBQUksQ0FBbUIsT0FBVSxFQUFFLE9BQXdCO1FBQ3pELE9BQU8sc0JBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ3ZELENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUF1QixLQUFhO1FBQzlDLElBQUk7WUFDRixPQUFPLHNCQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBTSxDQUFBO1NBQ2xEO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUN2QyxNQUFNLElBQUksMEJBQWlCLEVBQUUsQ0FBQTthQUM5QjtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQ2pDLE9BQU8sSUFBSSxDQUFBO1NBQ1o7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQXJCWSxVQUFVO0lBRHRCLElBQUEsc0JBQVUsR0FBRTtJQUdSLFdBQUEsSUFBQSxrQkFBTSxFQUFDLGdCQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7NkNBQ0csZUFBTTtHQUh0QixVQUFVLENBcUJ0QjtBQXJCWSxnQ0FBVSJ9