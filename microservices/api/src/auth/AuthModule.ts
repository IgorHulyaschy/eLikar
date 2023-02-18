import { IModule, Module } from '@elikar/module'

import { AuthHospitalAdminMiddleware } from './middlewares'
import { AuthHospitalController } from './AuthHospitalController'

export class AuthModule extends Module {
  register(): IModule {
    return {
      deps: {
        services(container) {
          container.bind(AuthHospitalAdminMiddleware).toSelf().inSingletonScope()
        },
        webControllers: [AuthHospitalController]
      }
    }
  }
}
