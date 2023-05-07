import { Decorators } from '../constants'

export function onCallbackQuery(): MethodDecorator {
  return function (target, methodName, descriptor) {
    return Reflect.defineMetadata(Decorators.onCallbackQuery, methodName, target)
  }
}

export function getOnCallbackQuery(target: any): string {
  return Reflect.getMetadata(Decorators.onCallbackQuery, target)
}
