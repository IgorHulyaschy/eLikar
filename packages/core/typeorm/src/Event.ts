export class Event<Payload> {
  id!: string
  version!: number
  readonly eventName = this.constructor.name
  saved?: boolean
  constructor(public payload: Payload) {}
}
