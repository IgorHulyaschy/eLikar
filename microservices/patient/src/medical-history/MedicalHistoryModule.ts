import { module } from '@elikar/module'
import { MedicalHistoryRepository } from './MedicalHistoryRepository'
import { MedicalHistoryService } from './MedicalHistoryService'

@module({
  deps: {
    services(container) {
      container.bind(MedicalHistoryService).toSelf().inSingletonScope()
      container.bind(MedicalHistoryRepository).toSelf().inSingletonScope()
    }
  }
})
export class MedicalHistoryModule {}
