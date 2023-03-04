import { Decorators } from '../constants'

export function onMessage(message: string): MethodDecorator {
  return function (target, methodName, descriptor) {
    const previousValue = Reflect.getMetadata(Decorators.onMessage, target)

    let metadata = [{ message, methodName }]
    if (previousValue) metadata = [...previousValue, { message, methodName }]

    return Reflect.defineMetadata(Decorators.onMessage, metadata, target)
  }
}

export function getOnMessageMetadata(target: any): Array<{ message: string; methodName: string }> {
  return Reflect.getMetadata(Decorators.onMessage, target)
}
