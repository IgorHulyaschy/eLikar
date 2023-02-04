import { Module } from '@elikar/module'

import { HospitalProxy } from './HospitalProxy'
import { HospitalService } from './HospitalService'
import { HospitalWebController } from './HospitalWebController'

export class HospitalModule extends Module {
  register(): void {
    this.bind(HospitalProxy).toSelf().inSingletonScope()
    this.bind(HospitalWebController).toSelf().inSingletonScope()
    this.bind(HospitalService).toSelf().inSingletonScope()
  }
}
