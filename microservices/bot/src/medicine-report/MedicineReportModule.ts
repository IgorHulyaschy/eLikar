import { module } from '@elikar/module'
import { MedicineReportProxy } from './MedicineReportProxy'

@module({
  deps: {
    services(container) {
      container.bind(MedicineReportProxy).toSelf().inSingletonScope()
    }
  }
})
export class MedicineReportModule {}
