"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebControllersMetadata = exports.webController = void 0;
const inversify_1 = require("inversify");
const constants_1 = require("../constants");
function webController(subject) {
    return function (constructor) {
        (0, inversify_1.decorate)((0, inversify_1.injectable)(), constructor);
        const newMetadata = subject;
        return Reflect.defineMetadata(constants_1.Decorators.webController, newMetadata, constructor);
    };
}
exports.webController = webController;
function getWebControllersMetadata(constructor) {
    return Reflect.getMetadata(constants_1.Decorators.webController, constructor);
}
exports.getWebControllersMetadata = getWebControllersMetadata;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL3dlYkNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUNBQWdEO0FBQ2hELDRDQUF5QztBQUV6QyxTQUFnQixhQUFhLENBQUMsT0FBZTtJQUMzQyxPQUFPLFVBQVUsV0FBZ0I7UUFDL0IsSUFBQSxvQkFBUSxFQUFDLElBQUEsc0JBQVUsR0FBRSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBRW5DLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQTtRQUMzQixPQUFPLE9BQU8sQ0FBQyxjQUFjLENBQUMsc0JBQVUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ25GLENBQUMsQ0FBQTtBQUNILENBQUM7QUFQRCxzQ0FPQztBQUVELFNBQWdCLHlCQUF5QixDQUFDLFdBQWdCO0lBQ3hELE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyxzQkFBVSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQTtBQUNuRSxDQUFDO0FBRkQsOERBRUMifQ==