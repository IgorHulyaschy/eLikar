"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRpcControllerMetadata = exports.rpcController = void 0;
const inversify_1 = require("inversify");
const constants_1 = require("../constants");
function rpcController(rpcQueue) {
    return function (constructor) {
        (0, inversify_1.decorate)((0, inversify_1.injectable)(), constructor);
        Reflect.defineMetadata(constants_1.Decorators.rpcController, rpcQueue, constructor);
    };
}
exports.rpcController = rpcController;
function getRpcControllerMetadata(constructor) {
    return Reflect.getMetadata(constants_1.Decorators.rpcController, constructor);
}
exports.getRpcControllerMetadata = getRpcControllerMetadata;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBjQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL3JwY0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUNBQWdEO0FBQ2hELDRDQUF5QztBQUV6QyxTQUFnQixhQUFhLENBQUMsUUFBZ0I7SUFDNUMsT0FBTyxVQUFVLFdBQVc7UUFDMUIsSUFBQSxvQkFBUSxFQUFDLElBQUEsc0JBQVUsR0FBRSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBRW5DLE9BQU8sQ0FBQyxjQUFjLENBQUMsc0JBQVUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3pFLENBQUMsQ0FBQTtBQUNILENBQUM7QUFORCxzQ0FNQztBQUVELFNBQWdCLHdCQUF3QixDQUFDLFdBQWdCO0lBQ3ZELE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyxzQkFBVSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQTtBQUNuRSxDQUFDO0FBRkQsNERBRUMifQ==