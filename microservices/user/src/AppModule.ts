import { MessageListenerModule } from '@elikar/message-listener'
import { ApplicationModule } from '@elikar/application'
import { LoggerModule } from '@elikar/logger'
import { Container } from 'inversify'

import { App } from './App'
import { ConfigService } from './config'
import { UserModule } from './user'

export class AppModule extends ApplicationModule {
  constructor(private readonly config: ConfigService) {
    super()
  }

  init(): void {
    super.init()

    this.mainContainer.bind(App).toSelf().inSingletonScope()
  }

  localModules(): Container[] {
    return [new UserModule().init()]
  }

  importedModules(): Container[] {
    return [new MessageListenerModule().init(this.config.get('amqp')), new LoggerModule().init()]
  }
}
