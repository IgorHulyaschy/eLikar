import { IModule, Module } from '@elikar/module'

import { HospitalProxy } from './HospitalProxy'
import { HospitalService } from './HospitalService'
import { HospitalWebController } from './HospitalWebController'

export class HospitalModule extends Module {
  register(): IModule {
    return {
      deps: {
        services(container) {
          container.bind(HospitalProxy).toSelf().inSingletonScope()
          container.bind(HospitalService).toSelf().inSingletonScope()
        },
        webControllers: [HospitalWebController]
      }
    }
  }
}
