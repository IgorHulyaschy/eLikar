import { module } from '@elikar/module'
import { PatientProxy } from './PatientProxy'

@module({
  deps: {
    services(container) {
      container.bind(PatientProxy).toSelf().inSingletonScope()
    }
  }
})
export class PatientModule {}
