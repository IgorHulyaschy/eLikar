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
exports.BcryptService = void 0;
const inversify_1 = require("inversify");
const bcrypt_1 = __importDefault(require("bcrypt"));
const constants_1 = require("./constants");
let BcryptService = class BcryptService {
    constructor(config) {
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: config
        });
    }
    hash(stringToHash) {
        return bcrypt_1.default.hash(stringToHash, this.config.saltRounds);
    }
    compare(stringToCompare, hash) {
        return bcrypt_1.default.compare(stringToCompare, hash);
    }
};
BcryptService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(constants_1.TYPES.Options)),
    __metadata("design:paramtypes", [Object])
], BcryptService);
exports.BcryptService = BcryptService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmNyeXB0U2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9CY3J5cHRTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUE4QztBQUM5QyxvREFBMkI7QUFDM0IsMkNBQW1DO0FBSTVCLElBQU0sYUFBYSxHQUFuQixNQUFNLGFBQWE7SUFDeEIsWUFBb0QsTUFBZTs7Ozs7bUJBQWY7O0lBQWtCLENBQUM7SUFFdkUsSUFBSSxDQUFDLFlBQW9CO1FBQ3ZCLE9BQU8sZ0JBQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDMUQsQ0FBQztJQUVELE9BQU8sQ0FBQyxlQUF1QixFQUFFLElBQVk7UUFDM0MsT0FBTyxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDOUMsQ0FBQztDQUNGLENBQUE7QUFWWSxhQUFhO0lBRHpCLElBQUEsc0JBQVUsR0FBRTtJQUVFLFdBQUEsSUFBQSxrQkFBTSxFQUFDLGlCQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7O0dBRHZCLGFBQWEsQ0FVekI7QUFWWSxzQ0FBYSJ9