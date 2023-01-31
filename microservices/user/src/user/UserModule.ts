import { Module } from '@elikar/module'

import { UserCommandController } from './UserCommandController'
import { UserService } from './UserService'

export class UserModule extends Module {
  register(): void {
    this.bind(UserCommandController).toSelf().inSingletonScope()
    this.bind(UserService).toSelf().inSingletonScope()
  }
}
