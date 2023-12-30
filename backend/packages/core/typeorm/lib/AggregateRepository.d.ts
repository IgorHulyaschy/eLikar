import 'reflect-metadata';
import { Event } from './Event';
import { Aggregate } from './Aggregate';
import { Class, PartialDeep } from 'type-fest';
export interface IAggregateRepository<Domain extends Aggregate<any>, AggregateEvent extends Event<any>> {
    save: (aggregate: Domain) => Promise<void>;
    findOne: ({ aggregateId }: {
        aggregateId: string;
    }) => Promise<Domain>;
    findAllByEvent: <TEvent extends Class<Event<any>>>(event: TEvent, { payload }: PartialDeep<AggregateEvent>) => Promise<Domain[]>;
}
export declare function AggregateRepository<Domain extends Aggregate<any>, AggregateEvent extends Event<any>>({ domain, aggreagteEvents, entity }: {
    domain: Class<Domain>;
    aggreagteEvents: Array<Class<AggregateEvent>>;
    entity: Class<AggregateEvent>;
}): Class<IAggregateRepository<Domain, AggregateEvent>>;
//# sourceMappingURL=AggregateRepository.d.ts.map