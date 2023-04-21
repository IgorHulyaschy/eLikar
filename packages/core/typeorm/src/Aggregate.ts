import { randomUUID } from 'crypto'
import { Event } from './Event'

export abstract class Aggregate<TEvent extends Event<any>> {
  id: string = randomUUID()
  version = 0

  domainEvents: TEvent[] = []

  abstract on(event: TEvent): void

  addEvents(events: TEvent | TEvent[]): this {
    const domainEvents = Array.isArray(events) ? events : [events]

    for (const event of domainEvents) {
      if (!event.id) event.id = this.id
      if (!event.version) event.version = this.version + 1
      this.domainEvents.push(event)
      this.onEvent(event)
    }
    return this
  }

  private onEvent(event: TEvent): void {
    this.id = event.id
    this.version = event.version > this.version ? event.version : this.version
    this.on(event)
  }
}
