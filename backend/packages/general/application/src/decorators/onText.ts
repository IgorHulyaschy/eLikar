import { Decorators } from '../constants'

export function onText(regExp: RegExp): MethodDecorator {
  return function (target, methodName, descriptor) {
    const previousValue = Reflect.getMetadata(Decorators.onText, target)
    let metadata = [{ regExp, methodName }]

    if (previousValue) metadata = [...previousValue, { regExp, methodName }]

    return Reflect.defineMetadata(Decorators.onText, metadata, target)
  }
}

export function getOnTextMetadata(target: any): Array<{ regExp: RegExp; methodName: string }> {
  return Reflect.getMetadata(Decorators.onText, target)
}
