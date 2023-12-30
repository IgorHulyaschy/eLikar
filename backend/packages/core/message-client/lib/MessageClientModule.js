"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageClientModule = void 0;
const module_1 = require("@elikar/module");
const MessageClient_1 = require("./MessageClient");
let MessageClientModule = class MessageClientModule {
};
MessageClientModule = __decorate([
    (0, module_1.module)({
        deps: {
            services(container) {
                container.bind(MessageClient_1.MessageClient).toSelf().inSingletonScope();
            }
        }
    })
], MessageClientModule);
exports.MessageClientModule = MessageClientModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZUNsaWVudE1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9NZXNzYWdlQ2xpZW50TW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJDQUF1QztBQUV2QyxtREFBK0M7QUFTeEMsSUFBTSxtQkFBbUIsR0FBekIsTUFBTSxtQkFBbUI7Q0FBRyxDQUFBO0FBQXRCLG1CQUFtQjtJQVAvQixJQUFBLGVBQU0sRUFBQztRQUNOLElBQUksRUFBRTtZQUNKLFFBQVEsQ0FBQyxTQUFTO2dCQUNoQixTQUFTLENBQUMsSUFBSSxDQUFDLDZCQUFhLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO1lBQzNELENBQUM7U0FDRjtLQUNGLENBQUM7R0FDVyxtQkFBbUIsQ0FBRztBQUF0QixrREFBbUIifQ==