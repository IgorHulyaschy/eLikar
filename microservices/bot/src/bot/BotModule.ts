import { module } from '@elikar/module'

import { BotController } from './BotController'
import { BotMessageController } from './BotMessageController'
import { BotRepository } from './BotRepository'
import { BotService } from './BotService'

@module({
  deps: {
    services(container) {
      container.bind(BotService).toSelf().inSingletonScope()
      container.bind(BotRepository).toSelf().inSingletonScope()
    },
    botControllers: [BotController],
    messageControllers: [BotMessageController]
  }
})
export class BotModule {}
