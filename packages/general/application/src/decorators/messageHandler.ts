import { Class } from 'type-fest'
import { Command } from '@elikar/message-client'
import { Decorators } from '../constants'

export function messageHandler<T extends Command<T['payload']>>(
  command: Class<Command<T['payload']>>
): MethodDecorator {
  return function (target, handlerName, descriptor) {
    const previousValue = Reflect.getMetadata(Decorators.messageHandlers, target)
    let metadata = [{ queue: command.name, handlerName }]

    if (previousValue) metadata = [...previousValue, { queue: command.name, handlerName }]

    return Reflect.defineMetadata(Decorators.messageHandlers, metadata, target)
  }
}

export function getMessageHandlersMetadata(
  target: any
): Array<{ queue: string; handlerName: string }> {
  return Reflect.getMetadata(Decorators.messageHandlers, target)
}
