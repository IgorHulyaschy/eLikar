"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnCallbackQuery = exports.onCallbackQuery = void 0;
const constants_1 = require("../constants");
function onCallbackQuery() {
    return function (target, methodName, descriptor) {
        return Reflect.defineMetadata(constants_1.Decorators.onCallbackQuery, methodName, target);
    };
}
exports.onCallbackQuery = onCallbackQuery;
function getOnCallbackQuery(target) {
    return Reflect.getMetadata(constants_1.Decorators.onCallbackQuery, target);
}
exports.getOnCallbackQuery = getOnCallbackQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25DYWxsYmFja1F1ZXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RlY29yYXRvcnMvb25DYWxsYmFja1F1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRDQUF5QztBQUV6QyxTQUFnQixlQUFlO0lBQzdCLE9BQU8sVUFBVSxNQUFNLEVBQUUsVUFBVSxFQUFFLFVBQVU7UUFDN0MsT0FBTyxPQUFPLENBQUMsY0FBYyxDQUFDLHNCQUFVLENBQUMsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUMvRSxDQUFDLENBQUE7QUFDSCxDQUFDO0FBSkQsMENBSUM7QUFFRCxTQUFnQixrQkFBa0IsQ0FBQyxNQUFXO0lBQzVDLE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyxzQkFBVSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUNoRSxDQUFDO0FBRkQsZ0RBRUMifQ==