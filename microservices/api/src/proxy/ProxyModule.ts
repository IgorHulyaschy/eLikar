import { Module } from '@elikar/module'
import { injectable } from 'inversify'
import { UserProxy } from './UserProxy'

@injectable()
export class ProxyModule extends Module {
  register(): void {
    this.bind(UserProxy).toSelf().inSingletonScope()
  }
}
