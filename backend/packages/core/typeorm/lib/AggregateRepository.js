"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRepository = void 0;
/* eslint-disable new-cap */
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
require("reflect-metadata");
const TypeormUtils_1 = require("./TypeormUtils");
function AggregateRepository({ domain, aggreagteEvents, entity }) {
    let Repo = class Repo {
        mapToEvent(eventEntity, eventsAggregate) {
            const ctor = eventsAggregate.find((e) => e.name === eventEntity.eventName);
            if (!ctor)
                throw new Error('Cannot coerce message.');
            return (0, class_transformer_1.plainToInstance)(ctor, eventEntity);
        }
        async findOne({ aggregateId }, em = (0, typeorm_1.getManager)()) {
            const events = await em
                .createQueryBuilder(entity, 'e')
                .select()
                .where({
                aggregateId,
                eventName: (0, typeorm_1.In)(aggreagteEvents.map((event) => event.name))
            })
                .orderBy('e.aggregateVersion', 'ASC')
                .getMany();
            const mapedEvents = events.map((e) => this.mapToEvent(e, aggreagteEvents));
            return new domain().addEvents(mapedEvents);
        }
        async findAllByEvent(event, { payload }, em = (0, typeorm_1.getManager)()) {
            const qb = em.createQueryBuilder(entity, 'e').select().where({
                eventName: event.name
            });
            const query = payload ? qb.andWhere(`payload @> :payload`, { payload }) : qb;
            const events = await query.orderBy('e.aggregateVersion', 'ASC').getMany();
            return Promise.all(events.map((event) => this.findOne({ aggregateId: event.aggregateId })));
        }
        async save(aggregate, em = (0, typeorm_1.getManager)()) {
            try {
                const aggsCopy = [].concat(aggregate);
                const eventsToSave = aggsCopy
                    .map((a) => a.domainEvents)
                    .flat()
                    .filter((de) => !de.saved)
                    .map((de) => (0, class_transformer_1.plainToInstance)(entity, (0, class_transformer_1.instanceToPlain)(de)));
                await em.save(eventsToSave);
            }
            catch (err) {
                if ((0, TypeormUtils_1.isUniqueKeyError)(err))
                    throw new Error('Not unique');
                throw err;
            }
        }
    };
    Repo = __decorate([
        (0, inversify_1.injectable)()
    ], Repo);
    return Repo;
}
exports.AggregateRepository = AggregateRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdncmVnYXRlUmVwb3NpdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BZ2dyZWdhdGVSZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDRCQUE0QjtBQUM1Qix5Q0FBc0M7QUFDdEMscUNBQXdDO0FBQ3hDLHlEQUFvRTtBQUNwRSw0QkFBeUI7QUFLekIsaURBQWlEO0FBY2pELFNBQWdCLG1CQUFtQixDQUdqQyxFQUNBLE1BQU0sRUFDTixlQUFlLEVBQ2YsTUFBTSxFQUtQO0lBRUMsSUFBTSxJQUFJLEdBQVYsTUFBTSxJQUFJO1FBQ0EsVUFBVSxDQUNoQixXQUF1QixFQUN2QixlQUFnQztZQUVoQyxNQUFNLElBQUksR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUMxRSxJQUFJLENBQUMsSUFBSTtnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7WUFFcEQsT0FBTyxJQUFBLG1DQUFlLEVBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBQzNDLENBQUM7UUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsV0FBVyxFQUEyQixFQUFFLEVBQUUsR0FBRyxJQUFBLG9CQUFVLEdBQUU7WUFDdkUsTUFBTSxNQUFNLEdBQUcsTUFBTSxFQUFFO2lCQUNwQixrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO2lCQUMvQixNQUFNLEVBQUU7aUJBQ1IsS0FBSyxDQUFDO2dCQUNMLFdBQVc7Z0JBQ1gsU0FBUyxFQUFFLElBQUEsWUFBRSxFQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMxRCxDQUFDO2lCQUNELE9BQU8sQ0FBQyxvQkFBb0IsRUFB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