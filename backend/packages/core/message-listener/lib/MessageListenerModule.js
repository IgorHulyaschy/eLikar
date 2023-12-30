"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageListenerModule = void 0;
const module_1 = require("@elikar/module");
const MessageListener_1 = require("./MessageListener");
let MessageListenerModule = class MessageListenerModule {
};
MessageListenerModule = __decorate([
    (0, module_1.module)({
        deps: {
            services(local) {
                local.bind(MessageListener_1.MessageListener).toSelf().inSingletonScope();
            }
        }
    })
], MessageListenerModule);
exports.MessageListenerModule = MessageListenerModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZUxpc3RlbmVyTW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL01lc3NhZ2VMaXN0ZW5lck1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQ0FBdUM7QUFDdkMsdURBQW1EO0FBUzVDLElBQU0scUJBQXFCLEdBQTNCLE1BQU0scUJBQXFCO0NBQUcsQ0FBQTtBQUF4QixxQkFBcUI7SUFQakMsSUFBQSxlQUFNLEVBQUM7UUFDTixJQUFJLEVBQUU7WUFDSixRQUFRLENBQUMsS0FBSztnQkFDWixLQUFLLENBQUMsSUFBSSxDQUFDLGlDQUFlLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO1lBQ3pELENBQUM7U0FDRjtLQUNGLENBQUM7R0FDVyxxQkFBcUIsQ0FBRztBQUF4QixzREFBcUIifQ==