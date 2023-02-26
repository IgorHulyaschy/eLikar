import { module } from '@elikar/module'
import { HospitalProxy } from './HospitalProxy'
import { NurseProxy } from './NurseProxy'

@module({
  deps: {
    services(local) {
      local.bind(HospitalProxy).toSelf().inSingletonScope()
      local.bind(NurseProxy).toSelf().inSingletonScope()
    }
  }
})
export class ProxyModule {}
