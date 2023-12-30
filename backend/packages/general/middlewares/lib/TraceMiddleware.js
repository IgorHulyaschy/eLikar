"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceMiddleware = void 0;
const inversify_1 = require("inversify");
const als_1 = require("@elikar/als");
const crypto_1 = require("crypto");
let TraceMiddleware = class TraceMiddleware {
    static async use(_ctx, next) {
        return als_1.Tracing.run((0, crypto_1.randomUUID)(), next);
    }
};
TraceMiddleware = __decorate([
    (0, inversify_1.injectable)()
], TraceMiddleware);
exports.TraceMiddleware = TraceMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhY2VNaWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1RyYWNlTWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FBc0M7QUFFdEMscUNBQXFDO0FBRXJDLG1DQUFtQztBQUc1QixJQUFNLGVBQWUsR0FBckIsTUFBTSxlQUFlO0lBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQWEsRUFBRSxJQUFVO1FBQ3hDLE9BQU8sYUFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFBLG1CQUFVLEdBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0NBQ0YsQ0FBQTtBQUpZLGVBQWU7SUFEM0IsSUFBQSxzQkFBVSxHQUFFO0dBQ0EsZUFBZSxDQUkzQjtBQUpZLDBDQUFlIn0=