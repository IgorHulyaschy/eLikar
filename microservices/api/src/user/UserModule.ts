import { Module } from '@elikar/module'
import { UserService } from './UserService'
import { UserWebController } from './UserWebController'

export class UserModule extends Module {
  register(): void {
    this.bind(UserWebController).toSelf().inSingletonScope()
    this.bind(UserService).toSelf().inSingletonScope()
  }
}
