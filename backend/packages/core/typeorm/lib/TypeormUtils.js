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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUniqueKeyError = exports.createAggregateEntity = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
function createAggregateEntity(tableName) {
    let AggregateEntity = class AggregateEntity {
        constructor() {
            Object.defineProperty(this, "id", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "aggregateId", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "aggregateVersion", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "eventName", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "payload", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "saved", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "createdAt", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
        }
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], AggregateEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], AggregateEntity.prototype, "aggregateId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], AggregateEntity.prototype, "aggregateVersion", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], AggregateEntity.prototype, "eventName", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true,
            type: 'jsonb'
        }),
        __metadata("design:type", Object)
    ], AggregateEntity.prototype, "payload", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: true }),
        __metadata("design:type", Boolean)
    ], AggregateEntity.prototype, "saved", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: new Date() }),
        __metadata("design:type", Date)
    ], AggregateEntity.prototype, "createdAt", void 0);
    AggregateEntity = __decorate([
        (0, typeorm_1.Entity)({ name: tableName }),
        (0, typeorm_1.Index)(['aggregateId', 'aggregateVersion'], { unique: true })
    ], AggregateEntity);
    return AggregateEntity;
}
exports.createAggregateEntity = createAggregateEntity;
function isIndexError(error) {
    return error instanceof typeorm_1.QueryFailedError && error.code === '23505';
}
function isUniqueKeyError(error) {
    return isIndexError(error) && error.detail.includes('uniqueKey');
}
exports.isUniqueKeyError = isUniqueKeyError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZW9ybVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1R5cGVvcm1VdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSw0QkFBeUI7QUFDekIscUNBQWdGO0FBR2hGLFNBQWdCLHFCQUFxQixDQUFDLFNBQWlCO0lBR3JELElBQU0sZUFBZSxHQUFyQixNQUFNLGVBQWU7UUFBckI7WUFDRTs7Ozs7ZUFDVztZQUVYOzs7OztlQUNvQjtZQUVwQjs7Ozs7ZUFDeUI7WUFFekI7Ozs7O2VBQ2tCO1lBRWxCOzs7OztlQUk2QjtZQUU3Qjs7Ozs7ZUFDZTtZQUVmOzs7OztlQUNnQjtRQUNsQixDQUFDO0tBQUEsQ0FBQTtJQXZCQztRQUFDLElBQUEsdUJBQWEsR0FBRTs7K0NBQ0w7SUFFWDtRQUFDLElBQUEsZ0JBQU0sR0FBRTs7d0RBQ1c7SUFFcEI7UUFBQyxJQUFBLGdCQUFNLEdBQUU7OzZEQUNnQjtJQUV6QjtRQUFDLElBQUEsZ0JBQU0sR0FBRTs7c0RBQ1M7SUFFbEI7UUFBQyxJQUFBLGdCQUFNLEVBQUM7WUFDTixRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxPQUFPO1NBQ2QsQ0FBQzs7b0RBQzJCO0lBRTdCO1FBQUMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOztrREFDWDtJQUVmO1FBQUMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQztrQ0FDcEIsSUFBSTtzREFBQTtJQXZCWixlQUFlO1FBRnBCLElBQUEsZ0JBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztRQUMzQixJQUFBLGVBQUssRUFBQyxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO09BQ3ZELGVBQWUsQ0F3QnBCO0lBRUQsT0FBTyxlQUFlLENBQUE7QUFDeEIsQ0FBQztBQTlCRCxzREE4QkM7QUFFRCxTQUFTLFlBQVksQ0FBQyxLQUFZO0lBQ2hDLE9BQU8sS0FBSyxZQUFZLDBCQUFnQixJQUFLLEtBQWEsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFBO0FBQzdFLENBQUM7QUFFRCxTQUFnQixnQkFBZ0IsQ0FBQyxLQUFZO0lBQzNDLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQ2xFLENBQUM7QUFGRCw0Q0FFQyJ9