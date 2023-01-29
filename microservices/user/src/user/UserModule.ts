import { Container } from 'inversify'
import { UserCommandController } from './UserCommandController'
import { UserCommandRouter } from './UserCommandRouter'
import { UserService } from './UserService'

export class UserModule {
  container = new Container()
  init(): Container {
    this.container.bind(UserCommandRouter).toSelf().inSingletonScope()
    this.container.bind(UserCommandController).toSelf().inSingletonScope()
    this.container.bind(UserService).toSelf().inSingletonScope()
    return this.container
  }
}
