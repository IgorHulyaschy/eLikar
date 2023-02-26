import { module } from '@elikar/module'

import { NurseService } from './NurseService'
import { NurseWebController } from './NurseWebController'

@module({
  deps: {
    services(local) {
      local.bind(NurseService).toSelf().inSingletonScope()
    },
    webControllers: [NurseWebController]
  }
})
export class NurseModule {}
