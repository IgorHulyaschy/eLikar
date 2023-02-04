import { Module } from '@elikar/module'
import { HospitalCommandController } from './HospitalCommandController'
import { HospitalRepository } from './HospitalRepository'
import { HospitalRpcController } from './HospitalRpcController'
import { HospitalService } from './HospitalService'

export class HospitalModule extends Module {
  register(): void {
    this.bind(HospitalCommandController).toSelf().inSingletonScope()
    this.bind(HospitalRpcController).toSelf().inSingletonScope()
    this.bind(HospitalRepository).toSelf().inSingletonScope()
    this.bind(HospitalService).toSelf().inSingletonScope()
  }
}
