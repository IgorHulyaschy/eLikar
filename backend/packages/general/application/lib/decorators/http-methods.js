"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHttpHandlersMetadata = exports.del = exports.put = exports.post = exports.get = void 0;
const constants_1 = require("../constants");
function handler({ path, httpMethod }) {
    return function (target, handlerName, descriptor) {
        let metadataToSet = [{ path, handlerName, httpMethod }];
        const previusValue = Reflect.getMetadata(constants_1.Decorators.httpMethods, target);
        if (previusValue)
            metadataToSet = [...previusValue, { path, handlerName, httpMethod }];
        return Reflect.defineMetadata(constants_1.Decorators.httpMethods, metadataToSet, target);
    };
}
function get(path) {
    return handler({ path, httpMethod: constants_1.HTTPMethods.GET });
}
exports.get = get;
function post(path) {
    return handler({ path, httpMethod: constants_1.HTTPMethods.POST });
}
exports.post = post;
function put(path) {
    return handler({ path, httpMethod: constants_1.HTTPMethods.PUT });
}
exports.put = put;
function del(path) {
    return handler({ path, httpMethod: constants_1.HTTPMethods.DELETE });
}
exports.del = del;
function getHttpHandlersMetadata(target) {
    return Reflect.getMetadata(constants_1.Decorators.httpMethods, target);
}
exports.getHttpHandlersMetadata = getHttpHandlersMetadata;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1tZXRob2RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RlY29yYXRvcnMvaHR0cC1tZXRob2RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRDQUFzRDtBQUV0RCxTQUFTLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQTZDO0lBQzlFLE9BQU8sVUFBVSxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVU7UUFDOUMsSUFBSSxhQUFhLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQTtRQUN2RCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLHNCQUFVLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBRXhFLElBQUksWUFBWTtZQUFFLGFBQWEsR0FBRyxDQUFDLEdBQUcsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFBO1FBRXRGLE9BQU8sT0FBTyxDQUFDLGNBQWMsQ0FBQyxzQkFBVSxDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDOUUsQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQUVELFNBQWdCLEdBQUcsQ0FBQyxJQUFZO0lBQzlCLE9BQU8sT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSx1QkFBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7QUFDdkQsQ0FBQztBQUZELGtCQUVDO0FBRUQsU0FBZ0IsSUFBSSxDQUFDLElBQVk7SUFDL0IsT0FBTyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLHVCQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUN4RCxDQUFDO0FBRkQsb0JBRUM7QUFFRCxTQUFnQixHQUFHLENBQUMsSUFBWTtJQUM5QixPQUFPLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsdUJBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZELENBQUM7QUFGRCxrQkFFQztBQUVELFNBQWdCLEdBQUcsQ0FBQyxJQUFZO0lBQzlCLE9BQU8sT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSx1QkFBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7QUFDMUQsQ0FBQztBQUZELGtCQUVDO0FBRUQsU0FBZ0IsdUJBQXVCLENBQ3JDLE1BQVc7SUFFWCxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsc0JBQVUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDNUQsQ0FBQztBQUpELDBEQUlDIn0=