import { module } from '@elikar/module'
import { NurseMessageController } from './NurseMessageController'
import { NurseRepository } from './NurseRepository'
import { NurseRpcController } from './NurseRpcController'
import { NurseService } from './NurseService'
import { TelegramConnectionSaga } from './sagas'

@module({
  deps: {
    services(local) {
      local.bind(NurseRepository).toSelf().inSingletonScope()
      local.bind(NurseService).toSelf().inSingletonScope()
    },
    messageControllers: [NurseMessageController, TelegramConnectionSaga],
    rpcControllers: [NurseRpcController]
  }
})
export class NurseModule {}
