import { MessageListenerModule } from '@elikar/message-listener'
import { ApplicationModule, Modules } from '@elikar/module'
import { LoggerModule } from '@elikar/logger'
import { AmqpModule } from '@elikar/amqp'

import { ConfigService } from './config'
import { UserModule } from './user'
import { App } from './App'

export class AppModule extends ApplicationModule {
  constructor(private readonly config: ConfigService) {
    super()
  }

  init(): void {
    super.init()

    this.mainContainer.bind(App).toSelf().inSingletonScope()
  }

  modules(): Modules {
    return {
      import: [
        new AmqpModule().init(this.config.get('amqp')),
        new MessageListenerModule().init(),
        new LoggerModule().init()
      ],
      local: [new UserModule().init()]
    }
  }
}
