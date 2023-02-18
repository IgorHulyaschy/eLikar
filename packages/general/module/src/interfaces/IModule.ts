import { Container } from 'inversify'
import { DynamicModule } from '../DynamicModule'
import { Module } from '../Module'

export interface IModule {
  deps: {
    services: (container: Container) => void
    cqrsControllers?: any[]
    rpcControllers?: any[]
    webControllers?: any[]
  }
  imports?: Array<Module | DynamicModule<any>>
}
