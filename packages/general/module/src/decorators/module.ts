import { Container } from 'inversify'
import 'reflect-metadata'
import { Class } from 'type-fest'
import { IModule } from '../interfaces'

const smb = Symbol('bms')

export function module(module?: {
  imports?: IModule[]
  deps?: {
    services: (container: Container) => void
    messageControllers?: Array<Class<any>>
    rpcControllers?: Array<Class<any>>
    webControllers?: Array<Class<any>>
  }
}): ClassDecorator {
  return function (constructor) {
    if (!module) return
    return Reflect.defineMetadata(smb, module, constructor)
  }
}

export function getModuleMetadata(target: any): {
  imports?: IModule[]
  deps?: {
    services: (container: Container) => void
    messageControllers?: Array<Class<any>>
    rpcControllers?: Array<Class<any>>
    webControllers?: Array<Class<any>>
  }
} {
  return Reflect.getMetadata(smb, target)
}
