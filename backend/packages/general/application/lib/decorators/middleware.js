"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = exports.getMiddlewaresMetadata = exports.useMiddleware = void 0;
const inversify_1 = require("inversify");
const constants_1 = require("../constants");
function useMiddleware(constructor) {
    return function (target, prKey, descriptor) {
        const previusValue = Reflect.getMetadata(constants_1.Decorators.middleware, target);
        let metadata = [{ constructor, handlerName: prKey }];
        if (previusValue)
            metadata = [...previusValue, { constructor, handlerName: prKey }];
        return Reflect.defineMetadata(constants_1.Decorators.middleware, metadata, target);
    };
}
exports.useMiddleware = useMiddleware;
function getMiddlewaresMetadata(target) {
    return Reflect.getMetadata(constants_1.Decorators.middleware, target);
}
exports.getMiddlewaresMetadata = getMiddlewaresMetadata;
function middleware() {
    return function (constructor) {
        (0, inversify_1.decorate)((0, inversify_1.injectable)(), constructor);
    };
}
exports.middleware = middleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL21pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EseUNBQWdEO0FBRWhELDRDQUF5QztBQUV6QyxTQUFnQixhQUFhLENBQUMsV0FBOEI7SUFDMUQsT0FBTyxVQUFVLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVTtRQUN4QyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLHNCQUFVLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZFLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7UUFDcEQsSUFBSSxZQUFZO1lBQUUsUUFBUSxHQUFHLENBQUMsR0FBRyxZQUFZLEVBQUUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7UUFFbkYsT0FBTyxPQUFPLENBQUMsY0FBYyxDQUFDLHNCQUFVLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN4RSxDQUFDLENBQUE7QUFDSCxDQUFDO0FBUkQsc0NBUUM7QUFFRCxTQUFnQixzQkFBc0IsQ0FBQyxNQUFXO0lBSWhELE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyxzQkFBVSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUMzRCxDQUFDO0FBTEQsd0RBS0M7QUFFRCxTQUFnQixVQUFVO0lBQ3hCLE9BQU8sVUFBVSxXQUFXO1FBQzFCLElBQUEsb0JBQVEsRUFBQyxJQUFBLHNCQUFVLEdBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNyQyxDQUFDLENBQUE7QUFDSCxDQUFDO0FBSkQsZ0NBSUMifQ==