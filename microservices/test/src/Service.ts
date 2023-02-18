import { injectable } from 'inversify'

@injectable()
export class Service {
  foo(): void {
    console.log('foo')
  }

  middleware(): void {
    console.log('mid')
  }
}
