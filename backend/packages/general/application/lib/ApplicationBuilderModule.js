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
exports.ApplicationBuilderModule = void 0;
const module_1 = require("@elikar/module");
const inversify_1 = require("inversify");
const koa_1 = __importDefault(require("koa"));
const DomainApplication_1 = require("./DomainApplication");
const KoaApplication_1 = require("./KoaApplication");
let ApplicationBuilderModule = class ApplicationBuilderModule {
};
ApplicationBuilderModule = __decorate([
    (0, module_1.module)({
        deps: {
            services(container) {
                (0, inversify_1.decorate)((0, inversify_1.injectable)(), koa_1.default);
                container.bind(KoaApplication_1.KoaApplication).toSelf().inSingletonScope();
                container.bind(DomainApplication_1.DomainApplication).toSelf().inSingletonScope();
            }
        }
    })
], ApplicationBuilderModule);
exports.ApplicationBuilderModule = ApplicationBuilderModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb25CdWlsZGVyTW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0FwcGxpY2F0aW9uQnVpbGRlck1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBdUM7QUFDdkMseUNBQWdEO0FBQ2hELDhDQUFxQjtBQUVyQiwyREFBdUQ7QUFDdkQscURBQWlEO0FBVzFDLElBQU0sd0JBQXdCLEdBQTlCLE1BQU0sd0JBQXdCO0NBQUcsQ0FBQTtBQUEzQix3QkFBd0I7SUFUcEMsSUFBQSxlQUFNLEVBQUM7UUFDTixJQUFJLEVBQUU7WUFDSixRQUFRLENBQUMsU0FBUztnQkFDaEIsSUFBQSxvQkFBUSxFQUFDLElBQUEsc0JBQVUsR0FBRSxFQUFFLGFBQUcsQ0FBQyxDQUFBO2dCQUMzQixTQUFTLENBQUMsSUFBSSxDQUFDLCtCQUFjLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO2dCQUMxRCxTQUFTLENBQUMsSUFBSSxDQUFDLHFDQUFpQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtZQUMvRCxDQUFDO1NBQ0Y7S0FDRixDQUFDO0dBQ1csd0JBQXdCLENBQUc7QUFBM0IsNERBQXdCIn0=