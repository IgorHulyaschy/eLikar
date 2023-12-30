"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
const module_1 = require("@elikar/module");
const Logger_1 = require("./Logger");
let LoggerModule = class LoggerModule {
};
LoggerModule = __decorate([
    (0, module_1.module)({
        deps: {
            services(local) {
                local.bind(Logger_1.Logger).toSelf().inSingletonScope();
            }
        }
    })
], LoggerModule);
exports.LoggerModule = LoggerModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyTW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0xvZ2dlck1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQ0FBdUM7QUFDdkMscUNBQWlDO0FBUzFCLElBQU0sWUFBWSxHQUFsQixNQUFNLFlBQVk7Q0FBRyxDQUFBO0FBQWYsWUFBWTtJQVB4QixJQUFBLGVBQU0sRUFBQztRQUNOLElBQUksRUFBRTtZQUNKLFFBQVEsQ0FBQyxLQUFLO2dCQUNaLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtZQUNoRCxDQUFDO1NBQ0Y7S0FDRixDQUFDO0dBQ1csWUFBWSxDQUFHO0FBQWYsb0NBQVkifQ==