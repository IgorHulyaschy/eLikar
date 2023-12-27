import { module } from '@elikar/module'
import { MedicineMapper } from './MedicineMapper'
import { MedicineMessageController } from './MedicineMessageController'
import { MedicineRepository } from './MedicineRepository'
import { MedicineRpcController } from './MedicineRpcController'
import { MedicineService } from './MedicineService'

@module({
  deps: {
    services(container) {
      container.bind(MedicineService).toSelf().inSingletonScope()
      container.bind(MedicineRepository).toSelf().inSingletonScope()
      container.bind(MedicineMapper).toSelf().inSingletonScope()
    },
    messageControllers: [MedicineMessageController],
    rpcControllers: [MedicineRpcController]
  }
})
export class MedicineModule {}
