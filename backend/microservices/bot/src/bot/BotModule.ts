import { module } from '@elikar/module'

import { BotController } from './BotController'
import { BotMessageController } from './BotMessageController'
import { BotRepository } from './BotRepository'
import { BotService } from './BotService'
import { BotTemplatesGenerator } from './BotTemplatesGenerator'

@module({
  deps: {
    services(container) {
      container.bind(BotService).toSelf().inSingletonScope()
      container.bind(BotRepository).toSelf().inSingletonScope()
      container.bind(BotTemplatesGenerator).toSelf().inSingletonScope()
    },
    botControllers: [BotController],
    messageControllers: [BotMessageController]
  }
})
export class BotModule {}
