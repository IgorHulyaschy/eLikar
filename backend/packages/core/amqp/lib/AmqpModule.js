"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmqpModule = void 0;
const module_1 = require("@elikar/module");
const AmqpTransport_1 = require("./AmqpTransport");
const constants_1 = require("./constants");
let AmqpModule = class AmqpModule {
    static register(options) {
        return {
            deps: {
                services(container) {
                    container.bind(constants_1.TYPES.Options).toConstantValue(options);
                    container.bind(AmqpTransport_1.AmqpTransport).toSelf().inSingletonScope();
                }
            }
        };
    }
};
AmqpModule = __decorate([
    (0, module_1.module)()
], AmqpModule);
exports.AmqpModule = AmqpModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW1xcE1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BbXFwTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJDQUFnRDtBQUNoRCxtREFBK0M7QUFDL0MsMkNBQW1DO0FBSTVCLElBQU0sVUFBVSxHQUFoQixNQUFNLFVBQVU7SUFDckIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFnQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFO2dCQUNKLFFBQVEsQ0FBQyxTQUFTO29CQUNoQixTQUFTLENBQUMsSUFBSSxDQUFVLGlCQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFBO29CQUMvRCxTQUFTLENBQUMsSUFBSSxDQUFDLDZCQUFhLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO2dCQUMzRCxDQUFDO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFYWSxVQUFVO0lBRHRCLElBQUEsZUFBTSxHQUFFO0dBQ0ksVUFBVSxDQVd0QjtBQVhZLGdDQUFVIn0=