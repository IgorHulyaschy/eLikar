"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnTextMetadata = exports.onText = void 0;
const constants_1 = require("../constants");
function onText(regExp) {
    return function (target, methodName, descriptor) {
        const previousValue = Reflect.getMetadata(constants_1.Decorators.onText, target);
        let metadata = [{ regExp, methodName }];
        if (previousValue)
            metadata = [...previousValue, { regExp, methodName }];
        return Reflect.defineMetadata(constants_1.Decorators.onText, metadata, target);
    };
}
exports.onText = onText;
function getOnTextMetadata(target) {
    return Reflect.getMetadata(constants_1.Decorators.onText, target);
}
exports.getOnTextMetadata = getOnTextMetadata;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25UZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RlY29yYXRvcnMvb25UZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRDQUF5QztBQUV6QyxTQUFnQixNQUFNLENBQUMsTUFBYztJQUNuQyxPQUFPLFVBQVUsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVO1FBQzdDLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsc0JBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDcEUsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFBO1FBRXZDLElBQUksYUFBYTtZQUFFLFFBQVEsR0FBRyxDQUFDLEdBQUcsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUE7UUFFeEUsT0FBTyxPQUFPLENBQUMsY0FBYyxDQUFDLHNCQUFVLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUNwRSxDQUFDLENBQUE7QUFDSCxDQUFDO0FBVEQsd0JBU0M7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxNQUFXO0lBQzNDLE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyxzQkFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUN2RCxDQUFDO0FBRkQsOENBRUMifQ==