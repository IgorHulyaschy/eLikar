import { Module } from '@elikar/module'
import { AuthHospitalController } from './AuthHospitalController'

export class AuthModule extends Module {
  register(): void {
    this.bind(AuthHospitalController).toSelf().inSingletonScope()
  }
}
