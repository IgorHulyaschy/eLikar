"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aggregate = void 0;
const crypto_1 = require("crypto");
class Aggregate {
    constructor() {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (0, crypto_1.randomUUID)()
        });
        Object.defineProperty(this, "version", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "domainEvents", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    addEvents(events) {
        const domainEvents = Array.isArray(events) ? events : [events];
        for (const event of domainEvents) {
            if (!event.aggregateId)
                event.aggregateId = this.id;
            if (!event.aggregateVersion)
                event.aggregateVersion = this.version + 1;
            this.domainEvents.push(event);
            this.onEvent(event);
        }
        return this;
    }
    onEvent(event) {
        this.id = event.aggregateId;
        this.version = event.aggregateVersion > this.version ? event.aggregateVersion : this.version;
        this.on(event);
    }
}
exports.Aggregate = Aggregate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdncmVnYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0FnZ3JlZ2F0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFHbkMsTUFBc0IsU0FBUztJQUEvQjtRQUNFOzs7O21CQUFhLElBQUEsbUJBQVUsR0FBRTtXQUFBO1FBQ3pCOzs7O21CQUFVLENBQUM7V0FBQTtRQUVYOzs7O21CQUF5QixFQUFFO1dBQUE7SUFxQjdCLENBQUM7SUFqQkMsU0FBUyxDQUFDLE1BQXlCO1FBQ2pDLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUU5RCxLQUFLLE1BQU0sS0FBSyxJQUFJLFlBQVksRUFBRTtZQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7Z0JBQUUsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFBO1lBQ25ELElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCO2dCQUFFLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQTtZQUN0RSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ3BCO1FBQ0QsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBRU8sT0FBTyxDQUFDLEtBQWE7UUFDM0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFBO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUM1RixJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hCLENBQUM7Q0FDRjtBQXpCRCw4QkF5QkMifQ==