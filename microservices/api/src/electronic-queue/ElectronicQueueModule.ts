import { module } from '@elikar/module'
import { ElectronicQueueService } from './ElectronicQueueService'
import { ElectronicQueueWebController } from './ElectronicQueueWebController'

@module({
  deps: {
    services(container) {
      container.bind(ElectronicQueueService).toSelf().inSingletonScope()
    },
    webControllers: [ElectronicQueueWebController]
  }
})
export class ElectronicQueueModule {}
