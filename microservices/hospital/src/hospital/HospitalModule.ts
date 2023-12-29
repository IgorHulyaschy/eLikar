import { module } from '@elikar/module'
import { HospitalMessageController } from './HospitalMessageController'
import { HospitalMapper } from './HospitalMapper'
import { HospitalRepository } from './HospitalRepository'
import { HospitalRpcController } from './HospitalRpcController'
import { HospitalService } from './HospitalService'

@module({
  deps: {
    services(local) {
      local.bind(HospitalRepository).toSelf().inSingletonScope()
      local.bind(HospitalService).toSelf().inSingletonScope()
      local.bind(HospitalMapper).toSelf().inSingletonScope()
    },
    messageControllers: [HospitalMessageController],
    rpcControllers: [HospitalRpcController]
  }
})
export class HospitalModule {}
