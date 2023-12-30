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
exports.Repository = void 0;
/* eslint-disable new-cap */
const logger_1 = require("@elikar/logger");
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
function Repository(entity) {
    let Repos = class Repos {
        constructor(logger) {
            Object.defineProperty(this, "logger", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: logger
            });
        }
        async findOne(param, em = (0, typeorm_1.getManager)()) {
            const en = await em.findOne(entity, { where: param });
            if (!en)
                return undefined;
            const domain = new entity();
            domain.getEntity(en);
            return domain;
        }
        async save(entity, em = (0, typeorm_1.getManager)()) {
            return em.save(entity).catch((err) => {
                if (err.detail.includes('already exists')) {
                    this.logger.error(`Not unique error`);
                }
                throw err;
            });
        }
        async update({ id, ...toUpdate }, em = (0, typeorm_1.getManager)()) {
            await em.update(entity, { id }, toUpdate);
        }
    };
    Repos = __decorate([
        (0, inversify_1.injectable)(),
        __metadata("design:paramtypes", [logger_1.Logger])
    ], Repos);
    return Repos;
}
exports.Repository = Repository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwb3NpdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDRCQUE0QjtBQUM1QiwyQ0FBdUM7QUFDdkMseUNBQXNDO0FBRXRDLHFDQUFvQztBQWFwQyxTQUFnQixVQUFVLENBQ3hCLE1BQXFCO0lBRXJCLElBQ00sS0FBSyxHQURYLE1BQ00sS0FBSztRQUNULFlBQTZCLE1BQWM7Ozs7O3VCQUFkOztRQUFpQixDQUFDO1FBQy9DLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBc0IsRUFBRSxFQUFFLEdBQUcsSUFBQSxvQkFBVSxHQUFFO1lBQ3JELE1BQU0sRUFBRSxHQUFHLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNyRCxJQUFJLENBQUMsRUFBRTtnQkFBRSxPQUFPLFNBQVMsQ0FBQTtZQUV6QixNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFBO1lBQzNCLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDcEIsT0FBTyxNQUFNLENBQUE7UUFDZixDQUFDO1FBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFjLEVBQUUsRUFBRSxHQUFHLElBQUEsb0JBQVUsR0FBRTtZQUMxQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ25DLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtvQkFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtpQkFDdEM7Z0JBQ0QsTUFBTSxHQUFHLENBQUE7WUFDWCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsUUFBUSxFQUFVLEVBQUUsRUFBRSxHQUFHLElBQUEsb0JBQVUsR0FBRTtZQUN6RCxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsUUFBZSxDQUFDLENBQUE7UUFDbEQsQ0FBQztLQUNGLENBQUE7SUF2QkssS0FBSztRQURWLElBQUEsc0JBQVUsR0FBRTt5Q0FFMEIsZUFBTTtPQUR2QyxLQUFLLENBdUJWO0lBQ0QsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDO0FBN0JELGdDQTZCQyJ9