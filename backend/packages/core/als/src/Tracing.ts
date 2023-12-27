/* eslint-disable @typescript-eslint/no-extraneous-class */
import { AsyncLocalStorage } from 'async_hooks'
import { randomUUID } from 'crypto'

const trace = new AsyncLocalStorage<string>()

export class Tracing {
  static run<T>(id: string = randomUUID(), fn: (...args: any[]) => T): T {
    return trace.run(id, fn)
  }

  static getTrace(): string | undefined {
    return trace.getStore()
  }
}
