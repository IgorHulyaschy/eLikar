import { decorate, injectable } from 'inversify'

export function messageController(): ClassDecorator {
  return function (constructor) {
    decorate(injectable(), constructor)
  }
}
