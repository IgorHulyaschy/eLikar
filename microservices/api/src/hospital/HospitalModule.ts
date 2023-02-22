import { module } from '@elikar/module'

import { HospitalProxy } from './HospitalProxy'
import { HospitalService } from './HospitalService'
import { HospitalWebController } from './HospitalWebController'

@module({
  deps: {
    services(local) {
      local.bind(HospitalProxy).toSelf().inSingletonScope()
      local.bind(HospitalService).toSelf().inSingletonScope()
    },
    webControllers: [HospitalWebController]
  }
})
export class HospitalModule {}
