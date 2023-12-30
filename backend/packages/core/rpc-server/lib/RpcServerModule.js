"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcServerModule = void 0;
const module_1 = require("@elikar/module");
const RpcServer_1 = require("./RpcServer");
let RpcServerModule = class RpcServerModule {
};
RpcServerModule = __decorate([
    (0, module_1.module)({
        deps: {
            services(local) {
                local.bind(RpcServer_1.RpcServer).toSelf().inSingletonScope();
            }
        }
    })
], RpcServerModule);
exports.RpcServerModule = RpcServerModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnBjU2VydmVyTW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1JwY1NlcnZlck1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQ0FBdUM7QUFDdkMsMkNBQXVDO0FBU2hDLElBQU0sZUFBZSxHQUFyQixNQUFNLGVBQWU7Q0FBRyxDQUFBO0FBQWxCLGVBQWU7SUFQM0IsSUFBQSxlQUFNLEVBQUM7UUFDTixJQUFJLEVBQUU7WUFDSixRQUFRLENBQUMsS0FBSztnQkFDWixLQUFLLENBQUMsSUFBSSxDQUFDLHFCQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO1lBQ25ELENBQUM7U0FDRjtLQUNGLENBQUM7R0FDVyxlQUFlLENBQUc7QUFBbEIsMENBQWUifQ==