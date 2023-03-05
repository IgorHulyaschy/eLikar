import { module } from '@elikar/module'
import { HospitalProxy } from './HospitalProxy'

@module({
  deps: {
    services(container) {
      container.bind(HospitalProxy).toSelf().inSingletonScope()
    }
  }
})
export class HospitalModule {}
