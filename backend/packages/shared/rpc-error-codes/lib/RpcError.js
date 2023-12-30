"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcError = void 0;
class RpcError extends Error {
    constructor(code) {
        super();
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: code
        });
    }
}
exports.RpcError = RpcError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnBjRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUnBjRXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBYSxRQUFTLFNBQVEsS0FBSztJQUNqQyxZQUFxQixJQUFhO1FBQ2hDLEtBQUssRUFBRSxDQUFBOzs7OzttQkFEWTs7SUFFckIsQ0FBQztDQUNGO0FBSkQsNEJBSUMifQ==