import { module } from '@elikar/module'

import { AuthHospitalAdminMiddleware } from './middlewares'
import { AuthHospitalController } from './AuthHospitalController'

@module({
  deps: {
    services(local) {
      local.bind(AuthHospitalAdminMiddleware).toSelf().inSingletonScope()
    },
    webControllers: [AuthHospitalController]
  }
})
export class AuthModule {}
