import { module } from '@elikar/module'

import { HospitalService } from './HospitalService'
import { HospitalWebController } from './HospitalWebController'

@module({
  deps: {
    services(local) {
      local.bind(HospitalService).toSelf().inSingletonScope()
    },
    webControllers: [HospitalWebController]
  }
})
export class HospitalModule {}
