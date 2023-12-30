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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormProvider = void 0;
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const logger_1 = require("@elikar/logger");
const constants_1 = require("./constants");
let TypeormProvider = class TypeormProvider {
    constructor(options, logger) {
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: logger
        });
    }
    async bootstrap() {
        await (0, typeorm_1.createConnection)(this.options);
        this.logger.info('Typeorm connection has bootstraped');
    }
};
TypeormProvider = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(constants_1.TYPES.Options)),
    __metadata("design:paramtypes", [Object, logger_1.Logger])
], TypeormProvider);
exports.TypeormProvider = TypeormProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZW9ybVByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1R5cGVvcm1Qcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBOEM7QUFDOUMscUNBQTZEO0FBQzdELDJDQUF1QztBQUV2QywyQ0FBbUM7QUFHNUIsSUFBTSxlQUFlLEdBQXJCLE1BQU0sZUFBZTtJQUMxQixZQUMwQyxPQUEwQixFQUNqRCxNQUFjOzs7OzttQkFEUzs7Ozs7O21CQUN2Qjs7SUFDaEIsQ0FBQztJQUVKLEtBQUssQ0FBQyxTQUFTO1FBQ2IsTUFBTSxJQUFBLDBCQUFnQixFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFBO0lBQ3hELENBQUM7Q0FDRixDQUFBO0FBVlksZUFBZTtJQUQzQixJQUFBLHNCQUFVLEdBQUU7SUFHUixXQUFBLElBQUEsa0JBQU0sRUFBQyxpQkFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBOzZDQUNHLGVBQU07R0FIdEIsZUFBZSxDQVUzQjtBQVZZLDBDQUFlIn0=