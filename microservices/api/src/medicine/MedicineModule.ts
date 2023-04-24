import { module } from '@elikar/module'

import { MedicineService } from './MedicineService'
import { MedicineWebController } from './MedicineWebController'

@module({
  deps: {
    services(container) {
      container.bind(MedicineService).toSelf().inSingletonScope()
    },
    webControllers: [MedicineWebController]
  }
})
export class MedicineModule {}
