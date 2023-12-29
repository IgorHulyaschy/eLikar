import { module } from '@elikar/module'

import { AuthHospitalAdminMiddleware, AuthNurseMiddleware } from './middlewares'
import { AuthHospitalController } from './AuthHospitalController'

@module({
  deps: {
    services(local) {
      local.bind(AuthHospitalAdminMiddleware).toSelf().inSingletonScope()
      local.bind(AuthNurseMiddleware).toSelf().inSingletonScope()
    },
    webControllers: [AuthHospitalController]
  }
})
export class AuthModule {}
