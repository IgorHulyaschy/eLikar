import { module } from '@elikar/module'
import { MedicineReportMapper } from './MedicineReportMapper'

import { MedicineReportMessageController } from './MedicineReportMessageController'
import { MedicineReportRepository } from './MedicineReportRepository'
import { MedicineReportRpcController } from './MedicineReportRpcController'
import { MedicineReportService } from './MedicineReportService'

@module({
  deps: {
    services(container) {
      container.bind(MedicineReportService).toSelf().inSingletonScope()
      container.bind(MedicineReportRepository).toSelf().inSingletonScope()
      container.bind(MedicineReportMapper).toSelf().inSingletonScope()
    },
    messageControllers: [MedicineReportMessageController],
    rpcControllers: [MedicineReportRpcController]
  }
})
export class MedicineReportModule {}
