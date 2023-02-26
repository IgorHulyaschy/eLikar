import { module } from '@elikar/module'
import { HospitalProxy } from './HospitalProxy'

@module({
  deps: {
    services(local) {
      local.bind(HospitalProxy).toSelf().inSingletonScope()
    }
  }
})
export class ProxyModule {}
