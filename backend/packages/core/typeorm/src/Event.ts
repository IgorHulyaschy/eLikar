import { randomUUID } from 'crypto'

export class Event<Payload> {
  id: string = randomUUID()
  aggregateId!: string
  aggregateVersion!: number
  readonly eventName = this.constructor.name
  saved?: boolean
  constructor(public payload: Payload) {}
}
