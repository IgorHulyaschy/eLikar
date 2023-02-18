import { Container, injectable } from 'inversify'
import { Controller } from './Controller'
import Router from 'koa-joi-router'
import {
  getHttpHandlersMetadata,
  getMiddlewaresMetadata,
  getWebControllersMetadata
} from './decorators'
import { Middleware } from './Middleware'

@injectable()
export class Builder {
  initRouters(container: Container): any {
    const controller = container.get(Controller)
    const controllerMetadata = getWebControllersMetadata(Controller)
    const middlewareMetadata = getMiddlewaresMetadata(controller)

    const router = Router()

    const handlersMetadata = getHttpHandlersMetadata(controller)

    for (const metadata of handlersMetadata) {
      const middlewares = middlewareMetadata.filter(
        ({ handlerName }) => metadata.handlerName === handlerName
      )

      if (!middlewares.length) {
        router[metadata.httpMethod](
          controllerMetadata + metadata.path,
          controller[metadata.handlerName as keyof typeof controller].bind(controller)
        )
        continue
      }
      const [midd, ...other] = middlewares.map(({ constructor }) => {
        const middleware = container.get<Middleware>(constructor)
        return middleware.use.bind(middleware)
      })

      router[metadata.httpMethod](
        controllerMetadata + metadata.path,
        midd,
        ...other,
        controller[metadata.handlerName as keyof typeof controller].bind(controller)
      )
    }

    return router
  }
}
