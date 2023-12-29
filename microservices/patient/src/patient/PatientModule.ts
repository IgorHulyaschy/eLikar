import { module } from '@elikar/module'
import { PatientMapper } from './PatientMapper'
import { PatientMessageController } from './PatientMessageController'
import { PatientRepository } from './PatientRepository'
import { PatientRpcController } from './PatientRpcController'
import { PatientService } from './PatientService'

@module({
  deps: {
    services(container) {
      container.bind(PatientRepository).toSelf().inSingletonScope()
      container.bind(PatientService).toSelf().inSingletonScope()
      container.bind(PatientMapper).toSelf().inSingletonScope()
    },
    messageControllers: [PatientMessageController],
    rpcControllers: [PatientRpcController]
  }
})
export class PatientModule {}
