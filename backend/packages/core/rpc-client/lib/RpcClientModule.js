"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcClientModule = void 0;
const module_1 = require("@elikar/module");
const RpcClient_1 = require("./RpcClient");
let RpcClientModule = class RpcClientModule {
};
RpcClientModule = __decorate([
    (0, module_1.module)({
        deps: {
            services(container) {
                container.bind(RpcClient_1.RpcClient).toSelf().inSingletonScope();
            }
        }
    })
], RpcClientModule);
exports.RpcClientModule = RpcClientModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnBjQ2xpZW50TW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1JwY0NsaWVudE1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQ0FBdUM7QUFDdkMsMkNBQXVDO0FBU2hDLElBQU0sZUFBZSxHQUFyQixNQUFNLGVBQWU7Q0FBRyxDQUFBO0FBQWxCLGVBQWU7SUFQM0IsSUFBQSxlQUFNLEVBQUM7UUFDTixJQUFJLEVBQUU7WUFDSixRQUFRLENBQUMsU0FBUztnQkFDaEIsU0FBUyxDQUFDLElBQUksQ0FBQyxxQkFBUyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtZQUN2RCxDQUFDO1NBQ0Y7S0FDRixDQUFDO0dBQ1csZUFBZSxDQUFHO0FBQWxCLDBDQUFlIn0=