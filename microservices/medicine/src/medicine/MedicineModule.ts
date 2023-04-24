import { module } from '@elikar/module'
import { MedicineMessageController } from './MedicineMessageController'
import { MedicineRepository } from './MedicineRepository'
import { MedicineService } from './MedicineService'

@module({
  deps: {
    services(container) {
      container.bind(MedicineService).toSelf().inSingletonScope()
      container.bind(MedicineRepository).toSelf().inSingletonScope()
    },
    messageControllers: [MedicineMessageController]
  }
})
export class MedicineModule {}
