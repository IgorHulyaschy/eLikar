"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModuleMetadata = exports.module = void 0;
require("reflect-metadata");
const smb = Symbol('bms');
function module(module) {
    return function (constructor) {
        if (!module)
            return;
        return Reflect.defineMetadata(smb, module, constructor);
    };
}
exports.module = module;
function getModuleMetadata(target) {
    return Reflect.getMetadata(smb, target);
}
exports.getModuleMetadata = getModuleMetadata;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RlY29yYXRvcnMvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDRCQUF5QjtBQUl6QixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7QUFFekIsU0FBZ0IsTUFBTSxDQUFDLE1BU3RCO0lBQ0MsT0FBTyxVQUFVLFdBQVc7UUFDMUIsSUFBSSxDQUFDLE1BQU07WUFBRSxPQUFNO1FBQ25CLE9BQU8sT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3pELENBQUMsQ0FBQTtBQUNILENBQUM7QUFkRCx3QkFjQztBQUVELFNBQWdCLGlCQUFpQixDQUFDLE1BQVc7SUFVM0MsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUN6QyxDQUFDO0FBWEQsOENBV0MifQ==