import { decorate, injectable } from 'inversify'
import { Decorators } from '../constants'

export function rpcController(rpcQueue: string): ClassDecorator {
  return function (constructor) {
    decorate(injectable(), constructor)

    Reflect.defineMetadata(Decorators.rpcController, rpcQueue, constructor)
  }
}

export function getRpcControllerMetadata(constructor: any): string {
  return Reflect.getMetadata(Decorators.rpcController, constructor)
}
