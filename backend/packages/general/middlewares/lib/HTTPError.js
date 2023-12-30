"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPError = void 0;
class HTTPError extends Error {
    constructor({ status, message }) {
        super(message);
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "message", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.status = status;
        this.message = message;
    }
}
exports.HTTPError = HTTPError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSFRUUEVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0hUVFBFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLFNBQVUsU0FBUSxLQUFLO0lBR2xDLFlBQVksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUF1QztRQUNsRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFIaEI7Ozs7O1dBQXVCO1FBQ3ZCOzs7OztXQUF3QjtRQUd0QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtJQUN4QixDQUFDO0NBQ0Y7QUFSRCw4QkFRQyJ9