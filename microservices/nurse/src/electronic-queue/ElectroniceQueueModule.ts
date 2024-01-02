import { module } from '@elikar/module'
import { ElectronicQueueMapper } from './ElectronicQueueMapper'
import { ElectronicQueueMessageController } from './ElectronicQueueMessageController'
import { ElectronicQueueRepository } from './ElectronicQueueRepository'
import { ElectronicQueueService } from './ElectronicQueueService'

@module({
  deps: {
    services: (container) => {
      container.bind(ElectronicQueueService).toSelf().inSingletonScope()
      container.bind(ElectronicQueueMapper).toSelf().inSingletonScope()
      container.bind(ElectronicQueueRepository).toSelf().inSingletonScope()
    },
    messageControllers: [ElectronicQueueMessageController]
  }
})
export class ElectroniceQueueModule {}
