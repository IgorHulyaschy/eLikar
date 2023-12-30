"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTModule = void 0;
const module_1 = require("@elikar/module");
const contants_1 = require("./contants");
const JWTService_1 = require("./JWTService");
let JWTModule = class JWTModule {
    static register(options) {
        return {
            deps: {
                services(container) {
                    container.bind(JWTService_1.JWTService).toSelf().inSingletonScope();
                    container.bind(contants_1.TYPES.Options).toConstantValue(options);
                }
            }
        };
    }
};
JWTModule = __decorate([
    (0, module_1.module)()
], JWTModule);
exports.JWTModule = JWTModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSldUTW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0pXVE1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQ0FBZ0Q7QUFDaEQseUNBQWtDO0FBRWxDLDZDQUF5QztBQUdsQyxJQUFNLFNBQVMsR0FBZixNQUFNLFNBQVM7SUFDcEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFnQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFO2dCQUNKLFFBQVEsQ0FBQyxTQUFTO29CQUNoQixTQUFTLENBQUMsSUFBSSxDQUFDLHVCQUFVLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO29CQUN0RCxTQUFTLENBQUMsSUFBSSxDQUFVLGdCQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUNqRSxDQUFDO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFYWSxTQUFTO0lBRHJCLElBQUEsZUFBTSxHQUFFO0dBQ0ksU0FBUyxDQVdyQjtBQVhZLDhCQUFTIn0=