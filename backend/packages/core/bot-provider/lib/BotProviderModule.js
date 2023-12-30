"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotProviderModule = void 0;
const module_1 = require("@elikar/module");
const inversify_1 = require("inversify");
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const BotProvider_1 = require("./BotProvider");
const constants_1 = require("./constants");
let BotProviderModule = class BotProviderModule {
    static register(options) {
        return {
            deps: {
                services(container) {
                    (0, inversify_1.decorate)((0, inversify_1.injectable)(), node_telegram_bot_api_1.default);
                    container.bind(BotProvider_1.BotProvider).toSelf().inSingletonScope();
                    container.bind(constants_1.TYPES.Options).toConstantValue(options);
                }
            }
        };
    }
};
BotProviderModule = __decorate([
    (0, module_1.module)()
], BotProviderModule);
exports.BotProviderModule = BotProviderModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm90UHJvdmlkZXJNb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQm90UHJvdmlkZXJNb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQWdEO0FBQ2hELHlDQUFnRDtBQUNoRCxrRkFBK0M7QUFDL0MsK0NBQTJDO0FBQzNDLDJDQUFtQztBQUk1QixJQUFNLGlCQUFpQixHQUF2QixNQUFNLGlCQUFpQjtJQUM1QixNQUFNLENBQUMsUUFBUSxDQUFDLE9BQWdCO1FBQzlCLE9BQU87WUFDTCxJQUFJLEVBQUU7Z0JBQ0osUUFBUSxDQUFDLFNBQVM7b0JBQ2hCLElBQUEsb0JBQVEsRUFBQyxJQUFBLHNCQUFVLEdBQUUsRUFBRSwrQkFBVyxDQUFDLENBQUE7b0JBQ25DLFNBQVMsQ0FBQyxJQUFJLENBQUMseUJBQVcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUE7b0JBQ3ZELFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQ3hELENBQUM7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQVpZLGlCQUFpQjtJQUQ3QixJQUFBLGVBQU0sR0FBRTtHQUNJLGlCQUFpQixDQVk3QjtBQVpZLDhDQUFpQiJ9