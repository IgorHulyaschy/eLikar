"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormModule = void 0;
const module_1 = require("@elikar/module");
const constants_1 = require("./constants");
const TypeormProvider_1 = require("./TypeormProvider");
let TypeormModule = class TypeormModule {
    static register(options) {
        return {
            deps: {
                services(container) {
                    container.bind(TypeormProvider_1.TypeormProvider).toSelf().inSingletonScope();
                    container.bind(constants_1.TYPES.Options).toConstantValue(options);
                }
            }
        };
    }
};
TypeormModule = __decorate([
    (0, module_1.module)()
], TypeormModule);
exports.TypeormModule = TypeormModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZW9ybU1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9UeXBlb3JtTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJDQUFnRDtBQUVoRCwyQ0FBbUM7QUFDbkMsdURBQW1EO0FBRzVDLElBQU0sYUFBYSxHQUFuQixNQUFNLGFBQWE7SUFDeEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUEwQjtRQUN4QyxPQUFPO1lBQ0wsSUFBSSxFQUFFO2dCQUNKLFFBQVEsQ0FBQyxTQUFTO29CQUNoQixTQUFTLENBQUMsSUFBSSxDQUFDLGlDQUFlLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO29CQUMzRCxTQUFTLENBQUMsSUFBSSxDQUFvQixpQkFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDM0UsQ0FBQzthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRixDQUFBO0FBWFksYUFBYTtJQUR6QixJQUFBLGVBQU0sR0FBRTtHQUNJLGFBQWEsQ0FXekI7QUFYWSxzQ0FBYSJ9