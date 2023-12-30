"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisModule = void 0;
const module_1 = require("@elikar/module");
const constants_1 = require("./constants");
const RedisService_1 = require("./RedisService");
let RedisModule = class RedisModule {
    static register(options) {
        return {
            deps: {
                services(container) {
                    container.bind(RedisService_1.RedisService).toSelf().inSingletonScope();
                    container.bind(constants_1.TYPES.Options).toConstantValue(options);
                }
            }
        };
    }
};
RedisModule = __decorate([
    (0, module_1.module)()
], RedisModule);
exports.RedisModule = RedisModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkaXNNb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUmVkaXNNb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkNBQWdEO0FBRWhELDJDQUFtQztBQUVuQyxpREFBNkM7QUFHdEMsSUFBTSxXQUFXLEdBQWpCLE1BQU0sV0FBVztJQUN0QixNQUFNLENBQUMsUUFBUSxDQUFDLE9BQWdCO1FBQzlCLE9BQU87WUFDTCxJQUFJLEVBQUU7Z0JBQ0osUUFBUSxDQUFDLFNBQVM7b0JBQ2hCLFNBQVMsQ0FBQyxJQUFJLENBQUMsMkJBQVksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUE7b0JBQ3hELFNBQVMsQ0FBQyxJQUFJLENBQVUsaUJBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQ2pFLENBQUM7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQVhZLFdBQVc7SUFEdkIsSUFBQSxlQUFNLEdBQUU7R0FDSSxXQUFXLENBV3ZCO0FBWFksa0NBQVcifQ==