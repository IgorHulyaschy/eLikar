import { IModule, Module } from '@elikar/module'
import { HospitalMessageController } from './HospitalMessageController'
import { HospitalMapper } from './HospitalMapper'
import { HospitalRepository } from './HospitalRepository'
import { HospitalRpcController } from './HospitalRpcController'
import { HospitalService } from './HospitalService'

export class HospitalModule extends Module {
  register(): IModule {
    return {
      deps: {
        services(container) {
          container.bind(HospitalRepository).toSelf().inSingletonScope()
          container.bind(HospitalService).toSelf().inSingletonScope()
          container.bind(HospitalMapper).toSelf().inSingletonScope()
        },
        cqrsControllers: [HospitalMessageController],
        rpcControllers: [HospitalRpcController]
      }
    }
  }
}
