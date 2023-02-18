import { IModule, Module } from '@elikar/module'
import { HospitalCommandController } from './HospitalCommandController'
import { HospitalMapper } from './HospitalMapper'
import { HospitalRepository } from './HospitalRepository'
import { HospitalRpcController } from './HospitalRpcController'
import { HospitalService } from './HospitalService'

export class HospitalModule extends Module {
  register(): IModule {
    return {
      deps: {
        services(container) {
          container.bind(HospitalRpcController).toSelf().inSingletonScope()
          container.bind(HospitalRepository).toSelf().inSingletonScope()
          container.bind(HospitalService).toSelf().inSingletonScope()
          container.bind(HospitalMapper).toSelf().inSingletonScope()
        },
        cqrsControllers: [HospitalCommandController]
      }
    }
  }
}
