"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptModule = void 0;
const module_1 = require("@elikar/module");
const BcryptService_1 = require("./BcryptService");
const constants_1 = require("./constants");
let BcryptModule = class BcryptModule {
    static register(options) {
        return {
            deps: {
                services(container) {
                    container.bind(BcryptService_1.BcryptService).toSelf().inSingletonScope();
                    container.bind(constants_1.TYPES.Options).toConstantValue(options);
                }
            }
        };
    }
};
BcryptModule = __decorate([
    (0, module_1.module)()
], BcryptModule);
exports.BcryptModule = BcryptModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmNyeXB0TW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0JjcnlwdE1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQ0FBZ0Q7QUFFaEQsbURBQStDO0FBQy9DLDJDQUFtQztBQUk1QixJQUFNLFlBQVksR0FBbEIsTUFBTSxZQUFZO0lBQ3ZCLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBZ0I7UUFDOUIsT0FBTztZQUNMLElBQUksRUFBRTtnQkFDSixRQUFRLENBQUMsU0FBUztvQkFDaEIsU0FBUyxDQUFDLElBQUksQ0FBQyw2QkFBYSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtvQkFDekQsU0FBUyxDQUFDLElBQUksQ0FBVSxpQkFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDakUsQ0FBQzthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRixDQUFBO0FBWFksWUFBWTtJQUR4QixJQUFBLGVBQU0sR0FBRTtHQUNJLFlBQVksQ0FXeEI7QUFYWSxvQ0FBWSJ9