"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnMessageMetadata = exports.onMessage = void 0;
const constants_1 = require("../constants");
function onMessage(message) {
    return function (target, methodName, descriptor) {
        const previousValue = Reflect.getMetadata(constants_1.Decorators.onMessage, target);
        let metadata = [{ message, methodName }];
        if (previousValue)
            metadata = [...previousValue, { message, methodName }];
        return Reflect.defineMetadata(constants_1.Decorators.onMessage, metadata, target);
    };
}
exports.onMessage = onMessage;
function getOnMessageMetadata(target) {
    return Reflect.getMetadata(constants_1.Decorators.onMessage, target);
}
exports.getOnMessageMetadata = getOnMessageMetadata;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25NZXNzYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RlY29yYXRvcnMvb25NZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRDQUF5QztBQUV6QyxTQUFnQixTQUFTLENBQUMsT0FBZTtJQUN2QyxPQUFPLFVBQVUsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVO1FBQzdDLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsc0JBQVUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFFdkUsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFBO1FBQ3hDLElBQUksYUFBYTtZQUFFLFFBQVEsR0FBRyxDQUFDLEdBQUcsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUE7UUFFekUsT0FBTyxPQUFPLENBQUMsY0FBYyxDQUFDLHNCQUFVLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2RSxDQUFDLENBQUE7QUFDSCxDQUFDO0FBVEQsOEJBU0M7QUFFRCxTQUFnQixvQkFBb0IsQ0FBQyxNQUFXO0lBQzlDLE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyxzQkFBVSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUMxRCxDQUFDO0FBRkQsb0RBRUMifQ==