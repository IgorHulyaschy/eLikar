"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KoaApplication = void 0;
const inversify_1 = require("inversify");
const middlewares_1 = require("@elikar/middlewares");
const logger_1 = require("@elikar/logger");
const koa_1 = __importDefault(require("koa"));
const koa_body_1 = __importDefault(require("koa-body"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_router_1 = __importDefault(require("koa-router"));
const ApplicationBuilder_1 = require("./ApplicationBuilder");
let KoaApplication = class KoaApplication extends koa_1.default {
    constructor({ port }) {
        super();
        Object.defineProperty(this, "port", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "applicationBuilder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new ApplicationBuilder_1.ApplicationBuilder()
        });
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new logger_1.Logger()
        });
        this.port = port;
    }
    async start(ioc) {
        await this.init();
        this.use((0, cors_1.default)());
        this.use((0, koa_body_1.default)());
        this.use(middlewares_1.GlobalCatcher.use);
        this.use(middlewares_1.TraceMiddleware.use);
        this.initControllers(ioc);
        this.listen(this.port, () => {
            this.logger.info(`Koa web server started on port ${this.port}`);
        });
    }
    initControllers(ioc) {
        const router = new koa_router_1.default();
        const routers = this.applicationBuilder.buildHttpControllers(ioc);
        routers.forEach((r) => router.use('/api', r.middleware()));
        this.use(router.middleware());
    }
};
KoaApplication = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [Object])
], KoaApplication);
exports.KoaApplication = KoaApplication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS29hQXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvS29hQXBwbGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQXNDO0FBQ3RDLHFEQUFvRTtBQUNwRSwyQ0FBdUM7QUFDdkMsOENBQXFCO0FBQ3JCLHdEQUE4QjtBQUM5QixxREFBNEI7QUFDNUIsNERBQStCO0FBRS9CLDZEQUF5RDtBQUlsRCxJQUFlLGNBQWMsR0FBN0IsTUFBZSxjQUFlLFNBQVEsYUFBRztJQUk5QyxZQUFZLEVBQUUsSUFBSSxFQUFvQjtRQUNwQyxLQUFLLEVBQUUsQ0FBQTtRQUpUOzs7OztXQUE2QjtRQUM3Qjs7OzttQkFBc0MsSUFBSSx1Q0FBa0IsRUFBRTtXQUFBO1FBQzlEOzs7O21CQUEwQixJQUFJLGVBQU0sRUFBRTtXQUFBO1FBR3BDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0lBQ2xCLENBQUM7SUFJRCxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQXNCO1FBQ2hDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBRWpCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBQSxjQUFJLEdBQUUsQ0FBQyxDQUFBO1FBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBQSxrQkFBTyxHQUFFLENBQUMsQ0FBQTtRQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLDJCQUFhLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyw2QkFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRTdCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7UUFDakUsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRU8sZUFBZSxDQUFDLEdBQXNCO1FBQzVDLE1BQU0sTUFBTSxHQUFHLElBQUksb0JBQU0sRUFBRSxDQUFBO1FBRTNCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNqRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBRTFELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUE7SUFDL0IsQ0FBQztDQUNGLENBQUE7QUFqQ3FCLGNBQWM7SUFEbkMsSUFBQSxzQkFBVSxHQUFFOztHQUNTLGNBQWMsQ0FpQ25DO0FBakNxQix3Q0FBYyJ9