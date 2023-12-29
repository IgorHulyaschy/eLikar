import { Container } from 'inversify'
import { Class } from 'type-fest'

export interface IModule {
  imports?: Array<IModule | Class<any>>
  deps?: {
    services: (container: Container) => void
    messageControllers?: Array<Class<any>>
    rpcControllers?: Array<Class<any>>
    webControllers?: Array<Class<any>>
    botControllers?: Array<Class<any>>
  }
}
