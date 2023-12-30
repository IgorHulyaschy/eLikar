import { Class } from 'type-fest';
import { Domain } from './Domain';
type Ctor<Entity> = Domain<Entity> & Record<string, any> & {
    id: string;
};
export interface IRepository<Entity extends Ctor<Entity>> {
    save: (entity: Entity) => Promise<Entity>;
    findOne: (param: Partial<Entity>) => Promise<Entity | undefined>;
    update: (data: Entity) => Promise<void>;
}
export declare function Repository<Entity extends Ctor<Entity>>(entity: Class<Entity>): Class<IRepository<Entity>>;
export {};
//# sourceMappingURL=Repository.d.ts.map