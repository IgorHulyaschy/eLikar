import 'reflect-metadata'
import { Class } from 'type-fest'
import Router from 'koa-joi-router'
import { Container, injectable } from 'inversify'
import { Middleware } from '@elikar/middlewares'

import { getHttpHandlersMetadata, getWebControllersMetadata } from './decorators'
import { getMiddlewaresMetadata } from './decorators/middleware'

@injectable()
export class ApplicationBuilder {
  buildHttpControllers(controllers: Array<Class<any>>, container: Container): Router.Router[] {
    return controllers.map((ctor) => {
      const router = Router()
      const controller = container.get(ctor)

      const controllerMetadata = getWebControllersMetadata(ctor)
      const handlersMetadata = getHttpHandlersMetadata(controller)
      const middlewaresMetadata = getMiddlewaresMetadata(controller)

      for (const metadata of handlersMetadata) {
        const middlewares = middlewaresMetadata
          ? middlewaresMetadata.filter(({ handlerName }) => metadata.handlerName === handlerName)
          : null

        if (!middlewares?.length) {
          router[metadata.httpMethod](
            controllerMetadata + metadata.path,
            controller[metadata.handlerName as keyof typeof controller].bind(controller)
          )
          continue
        }

        const [middeware, ...otherMiddlewares] = middlewares.map(({ constructor }) => {
          const middleware = container.get<Middleware>(constructor)
          return middleware.use.bind(middleware)
        })

        router[metadata.httpMethod](
          controllerMetadata + metadata.path,
          middeware,
          ...otherMiddlewares,
          controller[metadata.handlerName as keyof typeof controller].bind(controller)
        )
      }

      return router
    })
  }
}
