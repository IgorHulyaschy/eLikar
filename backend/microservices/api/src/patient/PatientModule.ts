import { module } from '@elikar/module'
import { PatientService } from './PatientService'
import { PatientWebController } from './PatientWebController'

@module({
  deps: {
    services(container) {
      container.bind(PatientService).toSelf().inSingletonScope()
    },
    webControllers: [PatientWebController]
  }
})
export class PatientModule {}
