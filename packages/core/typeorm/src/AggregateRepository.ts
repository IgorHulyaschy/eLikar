/* eslint-disable new-cap */
import { injectable } from 'inversify'
import { getManager } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { Event } from './Event'
import { Aggregate } from './Aggregate'
import { Class } from 'type-fest'
import { isUniqueKeyError } from './TypeormUtils'

export interface IRepository<Domain extends Aggregate<any>> {
  save: (aggregate: Domain) => Promise<void>
  findOne: ({ id }: { id: string }) => Promise<Domain>
}

export function AggregateRepository<
  Domain extends Aggregate<any>,
  AggregateEvent extends Event<any>
>(
  domain: Class<Domain>,
  aggreagteEvents: Array<Class<AggregateEvent>>,
  tableName: string
): Class<IRepository<Domain>> {
  @injectable()
  class Repo {
    private mapToEvent<T extends AggregateEvent>(
      eventEntity: Event<any>,
      eventsAggregate: Array<Class<T>>
    ): T {
      const ctor = eventsAggregate.find((e) => e.name === eventEntity.eventName)
      if (!ctor) throw new Error('Cannot coerce message.')

      return plainToClass(ctor, eventEntity)
    }

    async findOne({ id }: { id: string }, em = getManager()): Promise<Domain> {
      const events = await em.query(
        `
        SELECT id, payload, version, eventName
        FROM @1
        WHERE id = @0
        ORDER BY version
      `,
        [id, tableName]
      )
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

    async save(aggregate: Domain, em = getManager()): Promise<void> {
      try {
        const events = aggregate.domainEvents.filter((de) => !de.saved)
        await em.save(events)
      } catch (err) {
        if (isUniqueKeyError(err)) throw new Error('Not unique')
        throw err
      }
    }
  }
  return Repo
}
