import { module } from '@elikar/module'
import { NurseMapper } from './NurseMapper'
import { NurseMessageController } from './NurseMessageController'
import { NurseRepository } from './NurseRepository'
import { NurseRpcController } from './NurseRpcController'
import { NurseService } from './NurseService'
import { TelegramConnectionSaga } from './sagas'
import { MedicineReportCreateSaga } from './sagas/MedicineReportCreateSaga'

@module({
  deps: {
    services(local) {
      local.bind(NurseRepository).toSelf().inSingletonScope()
      local.bind(NurseService).toSelf().inSingletonScope()
      local.bind(NurseMapper).toSelf().inSingletonScope()
    },
    messageControllers: [NurseMessageController, TelegramConnectionSaga, MedicineReportCreateSaga],
    rpcControllers: [NurseRpcController]
  }
})
export class NurseModule {}
