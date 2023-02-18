import { decorate, injectable } from 'inversify'
import { Context, Next } from 'koa'
import 'reflect-metadata'
import { Decorators, HTTPMethods } from './constants'
import { Class } from 'type-fest'

export interface Middleware {
  use: (ctx: Context, next: Next) => Promise<any>
}

function handler({ path, httpMethod }: { path: string; httpMethod: HTTPMethods }): MethodDecorator {
  return function (target, handlerName, descriptor) {
    let metadataToSet = [{ path, handlerName, httpMethod }]
    const previusValue = Reflect.getMetadata(Decorators.httpMethods, target)

    if (previusValue) metadataToSet = [...previusValue, { path, handlerName, httpMethod }]

    return Reflect.defineMetadata(Decorators.httpMethods, metadataToSet, target)
  }
}

export function get(path: string): MethodDecorator {
  return handler({ path, httpMethod: HTTPMethods.GET })
}

export function post(path: string): MethodDecorator {
  return handler({ path, httpMethod: HTTPMethods.POST })
}

export function put(path: string): MethodDecorator {
  return handler({ path, httpMethod: HTTPMethods.PUT })
}

export function del(path: string): MethodDecorator {
  return handler({ path, httpMethod: HTTPMethods.DELETE })
}

export function getHttpHandlersMetadata(
  target: any
): Array<{ path: string; handlerName: string; httpMethod: HTTPMethods }> {
  return Reflect.getMetadata(Decorators.httpMethods, target)
}

export function webController(subject: string): ClassDecorator {
  return function (constructor: any) {
    decorate(injectable(), constructor)

    const newMetadata = subject
    return Reflect.defineMetadata(Decorators.webController, newMetadata, constructor)
  }
}

export function getWebControllersMetadata(constructor: any): string {
  return Reflect.getMetadata(Decorators.webController, constructor)
}

export function useMiddleware(constructor: any): MethodDecorator {
  return function (target, prKey, descriptor) {
    const previusValue = Reflect.getMetadata(Decorators.middleware, target)
    let metadata = [{ constructor, handlerName: prKey }]
    if (previusValue) metadata = [...previusValue, { constructor, handlerName: prKey }]

    return Reflect.defineMetadata(Decorators.middleware, metadata, target)
  }
}

export function getMiddlewaresMetadata(target: any): Array<{
  constructor: Class<Middleware>
  handlerName: string
}> {
  return Reflect.getMetadata(Decorators.middleware, target)
}

export function middleware(): ClassDecorator {
  return function (cons) {
    decorate(injectable(), cons)
  }
}
