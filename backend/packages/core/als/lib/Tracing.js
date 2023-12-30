"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracing = void 0;
/* eslint-disable @typescript-eslint/no-extraneous-class */
const async_hooks_1 = require("async_hooks");
const crypto_1 = require("crypto");
const trace = new async_hooks_1.AsyncLocalStorage();
class Tracing {
    static run(id = (0, crypto_1.randomUUID)(), fn) {
        return trace.run(id, fn);
    }
    static getTrace() {
        return trace.getStore();
    }
}
exports.Tracing = Tracing;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhY2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9UcmFjaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUEyRDtBQUMzRCw2Q0FBK0M7QUFDL0MsbUNBQW1DO0FBRW5DLE1BQU0sS0FBSyxHQUFHLElBQUksK0JBQWlCLEVBQVUsQ0FBQTtBQUU3QyxNQUFhLE9BQU87SUFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBSSxLQUFhLElBQUEsbUJBQVUsR0FBRSxFQUFFLEVBQXlCO1FBQ2hFLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRO1FBQ2IsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUE7SUFDekIsQ0FBQztDQUNGO0FBUkQsMEJBUUMifQ==