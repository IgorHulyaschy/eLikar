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
exports.RedisService = void 0;
const inversify_1 = require("inversify");
const ioredis_1 = __importDefault(require("ioredis"));
const constants_1 = require("./constants");
let RedisService = class RedisService {
    constructor({ url }) {
        Object.defineProperty(this, "redis", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.redis = new ioredis_1.default(6379);
    }
    set(key, value) {
        if (typeof value === 'object')
            value = JSON.stringify(value);
        return this.redis.set(key, value);
    }
    async get(key) {
        const value = await this.redis.get(key);
        if (!value)
            return null;
        return JSON.parse(value);
    }
    delete(key) {
        return this.redis.del(key);
    }
};
RedisService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(constants_1.TYPES.Options)),
    __metadata("design:paramtypes", [Object])
], RedisService);
exports.RedisService = RedisService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkaXNTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1JlZGlzU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBOEM7QUFDOUMsc0RBQTJCO0FBQzNCLDJDQUFtQztBQUk1QixJQUFNLFlBQVksR0FBbEIsTUFBTSxZQUFZO0lBRXZCLFlBQW1DLEVBQUUsR0FBRyxFQUFXO1FBRG5EOzs7OztXQUE2QjtRQUUzQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksaUJBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM5QixDQUFDO0lBRUQsR0FBRyxDQUFDLEdBQVcsRUFBRSxLQUErQjtRQUM5QyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7WUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM1RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBSSxHQUFXO1FBQ3RCLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFFdkMsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPLElBQUksQ0FBQTtRQUN2QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDNUIsQ0FBQztDQUNGLENBQUE7QUFyQlksWUFBWTtJQUR4QixJQUFBLHNCQUFVLEdBQUU7SUFHRSxXQUFBLElBQUEsa0JBQU0sRUFBQyxpQkFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBOztHQUZ2QixZQUFZLENBcUJ4QjtBQXJCWSxvQ0FBWSJ9