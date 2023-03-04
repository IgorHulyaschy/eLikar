import { IModule, module } from '@elikar/module'
import { BotProviderModule } from '@elikar/bot-provider'

import { App } from './App'
import { BotModule } from './bot'
import { ConfigService } from './config'
import { LoggerModule } from '@elikar/logger'

export const TYPES = {
  Options: 'Options'
}

@module()
export class AppModule {
  static register(config: ConfigService): IModule {
    return {
      imports: [BotProviderModule.register(config.get('bot')), BotModule, LoggerModule],
      deps: {
        services(container) {
          container.bind(App).toSelf().inSingletonScope()
          container.bind(TYPES.Options).toConstantValue(config.get('application'))
        }
      }
    }
  }
}
