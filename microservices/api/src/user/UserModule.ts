import { Container } from 'inversify'
import { UserRouter } from './UserRouter'
import { UserService } from './UserService'
import { UserWebController } from './UserWebController'

export class UserModule {
  container = new Container()
  init(): Container {
    this.container.bind(UserRouter).toSelf().inSingletonScope()
    this.container.bind(UserWebController).toSelf().inSingletonScope()
    this.container.bind(UserService).toSelf().inSingletonScope()
    return this.container
  }
}
