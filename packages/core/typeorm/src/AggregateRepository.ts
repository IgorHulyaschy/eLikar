/* eslint-disable new-cap */
import { injectable } from 'inversify'
import { getManager, In } from 'typeorm'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import 'reflect-metadata'

import { Event } from './Event'
import { Aggregate } from './Aggregate'
import { Class, PartialDeep } from 'type-fest'
import { isUniqueKeyError } from './TypeormUtils'

export interface IAggregateRepository<
  Domain extends Aggregate<any>,
  AggregateEvent extends Event<any>
> {
  save: (aggregate: Domain) => Promise<void>
  findOne: ({ id }: { id: string }) => Promise<Domain>
  findAllByEvent: <TEvent extends Class<Event<any>>>(
    event: TEvent,
    { payload }: PartialDeep<AggregateEvent>
  ) => Promise<Domain[]>
}

export function AggregateRepository<
  Domain extends Aggregate<any>,
  AggregateEvent extends Event<any>
>({
  domain,
  aggreagteEvents,
  entity
}: {
  domain: Class<Domain>
  aggreagteEvents: Array<Class<AggregateEvent>>
  entity: Class<AggregateEvent>
}): Class<IAggregateRepository<Domain, AggregateEvent>> {
  @injectable()
  class Repo implements IAggregateRepository<Domain, AggregateEvent> {
    private mapToEvent<T extends AggregateEvent>(
      eventEntity: Event<any>,
      eventsAggregate: Array<Class<T>>
    ): T {
      const ctor = eventsAggregate.find((e) => e.name === eventEntity.eventName)
      if (!ctor) throw new Error('Cannot coerce message.')

      return plainToInstance(ctor, eventEntity)
    }

    async findOne({ id }: { id: string }, em = getManager()): Promise<Domain> {
      const events = await em
        .createQueryBuilder(entity, 'e')
        .select()
        .where({
          id,
          eventName: In(aggreagteEvents.map((event) => event.name))
        })
        .orderBy('e.version', 'ASC')
        .getMany()
      const mapedEvents = events.map(
        (e: {
          id: string
          payload: Record<string, any>
          eventName: string
          version: number
          saved?: boolean
        }) => this.mapToEvent(e, aggreagteEvents)
      )
      return new domain().addEvents(mapedEvents)
    }

    async findAllByEvent<TEvent extends Class<Event<any>>>(
      event: TEvent,
      { payload }: PartialDeep<AggregateEvent>,
      em = getManager()
    ): Promise<Domain[]> {
      const qb = em.createQueryBuilder(entity, 'e').select().where({
        eventName: event.name
      })
      const query = payload ? qb.andWhere(`payload @> :payload`, { payload }) : qb

      const events = await query.orderBy('e.version', 'ASC').getMany()

      return Promise.all(events.map((event) => this.findOne({ id: event.id })))
    }

    async save(aggregate: Domain, em = getManager()): Promise<void> {
      try {
        const eventsToSave = aggregate.domainEvents
          .filter((de) => !de.saved)
          .map((de) => plainToInstance(entity, instanceToPlain(de)))
        await em.save(eventsToSave)
      } catch (err) {
        if (isUniqueKeyError(err)) throw new Error('Not unique')
        throw err
      }
    }
  }
  return Repo
}
