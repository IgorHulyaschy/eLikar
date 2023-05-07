import { module } from '@elikar/module'

import { MedicineReportMessageController } from './MedicineReportMessageController'
import { MedicineReportRepository } from './MedicineReportRepository'
import { MedicineReportService } from './MedicineReportService'

@module({
  deps: {
    services(container) {
      container.bind(MedicineReportService).toSelf().inSingletonScope()
      container.bind(MedicineReportRepository).toSelf().inSingletonScope()
    },
    messageControllers: [MedicineReportMessageController]
  }
})
export class MedicineReportModule {}
