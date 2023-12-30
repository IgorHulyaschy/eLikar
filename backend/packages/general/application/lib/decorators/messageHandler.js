"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageHandlersMetadata = exports.messageHandler = void 0;
const constants_1 = require("../constants");
function messageHandler(command) {
    return function (target, handlerName, descriptor) {
        const previousValue = Reflect.getMetadata(constants_1.Decorators.messageHandlers, target);
        let metadata = [{ queue: command.name, handlerName }];
        if (previousValue)
            metadata = [...previousValue, { queue: command.name, handlerName }];
        return Reflect.defineMetadata(constants_1.Decorators.messageHandlers, metadata, target);
    };
}
exports.messageHandler = messageHandler;
function getMessageHandlersMetadata(target) {
    return Reflect.getMetadata(constants_1.Decorators.messageHandlers, target);
}
exports.getMessageHandlersMetadata = getMessageHandlersMetadata;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGVjb3JhdG9ycy9tZXNzYWdlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSw0Q0FBeUM7QUFFekMsU0FBZ0IsY0FBYyxDQUM1QixPQUFxQztJQUVyQyxPQUFPLFVBQVUsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVO1FBQzlDLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsc0JBQVUsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDN0UsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUE7UUFFckQsSUFBSSxhQUFhO1lBQUUsUUFBUSxHQUFHLENBQUMsR0FBRyxhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFBO1FBRXRGLE9BQU8sT0FBTyxDQUFDLGNBQWMsQ0FBQyxzQkFBVSxDQUFDLGVBQWUsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDN0UsQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQVhELHdDQVdDO0FBRUQsU0FBZ0IsMEJBQTBCLENBQ3hDLE1BQVc7SUFFWCxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsc0JBQVUsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDaEUsQ0FBQztBQUpELGdFQUlDIn0=