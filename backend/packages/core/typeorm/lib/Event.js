"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const crypto_1 = require("crypto");
class Event {
    constructor(payload) {
        Object.defineProperty(this, "payload", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: payload
        });
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (0, crypto_1.randomUUID)()
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
            value: this.constructor.name
        });
        Object.defineProperty(this, "saved", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
}
exports.Event = Event;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBRW5DLE1BQWEsS0FBSztJQU1oQixZQUFtQixPQUFnQjs7Ozs7bUJBQWhCOztRQUxuQjs7OzttQkFBYSxJQUFBLG1CQUFVLEdBQUU7V0FBQTtRQUN6Qjs7Ozs7V0FBb0I7UUFDcEI7Ozs7O1dBQXlCO1FBQ3pCOzs7O21CQUFxQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7V0FBQTtRQUMxQzs7Ozs7V0FBZTtJQUN1QixDQUFDO0NBQ3hDO0FBUEQsc0JBT0MifQ==