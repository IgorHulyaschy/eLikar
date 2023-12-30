export declare class Event<Payload> {
    payload: Payload;
    id: string;
    aggregateId: string;
    aggregateVersion: number;
    readonly eventName: string;
    saved?: boolean;
    constructor(payload: Payload);
}
//# sourceMappingURL=Event.d.ts.map