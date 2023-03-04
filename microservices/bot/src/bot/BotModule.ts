import { module } from '@elikar/module'

import { BotController } from './BotController'
import { BotService } from './BotService'

@module({
  deps: {
    services(container) {
      container.bind(BotService).toSelf().inSingletonScope()
    },
    botControllers: [BotController]
  }
})
export class BotModule {}
