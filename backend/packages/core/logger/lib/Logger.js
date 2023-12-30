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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const inversify_1 = require("inversify");
const bunyan_1 = __importDefault(require("bunyan"));
const als_1 = require("@elikar/als");
let Logger = class Logger {
    constructor() {
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const streams = [
            { stream: process.stdout, level: 'info' },
            { stream: process.stdout, level: 'error' }
        ];
        this.logger = bunyan_1.default.createLogger({ name: 'Logger', streams });
    }
    get bunyan() {
        const traceId = als_1.Tracing.getTrace();
        return traceId ? this.logger.child({ traceId }) : this.logger;
    }
    debug(...params) {
        this.bunyan.debug(params);
    }
    error(...params) {
        this.bunyan.error(params);
    }
    info(...params) {
        this.bunyan.info(params);
    }
};
Logger = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], Logger);
exports.Logger = Logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBc0M7QUFDdEMsb0RBQW9DO0FBQ3BDLHFDQUFxQztBQUc5QixJQUFNLE1BQU0sR0FBWixNQUFNLE1BQU07SUFHakI7UUFGQTs7Ozs7V0FBd0M7UUFHdEMsTUFBTSxPQUFPLEdBQTZCO1lBQ3hDLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtZQUN6QyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7U0FDM0MsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQWUsQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7SUFDekUsQ0FBQztJQUVELElBQVksTUFBTTtRQUNoQixNQUFNLE9BQU8sR0FBRyxhQUFPLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDbEMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUMvRCxDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUcsTUFBYTtRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUcsTUFBYTtRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBRUQsSUFBSSxDQUFDLEdBQUcsTUFBYTtRQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMxQixDQUFDO0NBQ0YsQ0FBQTtBQTNCWSxNQUFNO0lBRGxCLElBQUEsc0JBQVUsR0FBRTs7R0FDQSxNQUFNLENBMkJsQjtBQTNCWSx3QkFBTSJ9