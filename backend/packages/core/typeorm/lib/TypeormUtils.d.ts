import { Class } from 'type-fest';
import 'reflect-metadata';
import { Event } from './Event';
export declare function createAggregateEntity(tableName: string): Class<Event<any>>;
export declare function isUniqueKeyError(error: Error): boolean;
//# sourceMappingURL=TypeormUtils.d.ts.map