import 'reflect-metadata'
import { Class } from 'type-fest'
import Router from 'koa-joi-router'
import { Container } from 'inversify'
import { Middleware } from '@elikar/middlewares'

import {
  getHttpHandlersMetadata,
  getMessageHandlersMetadata,
  getRpcControllerMetadata,
  // getRpcHandlersMetadata,
  getWebControllersMetadata
} from './decorators'
import { getMiddlewaresMetadata } from './decorators/middleware'

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

  buildMessageControllers(
    messageControllers: Array<Class<any>>,
    container: Container
  ): Array<{ queue: string; handler: (data: any) => Promise<any> }> {
    const resolvedHandlers = messageControllers.map((ctorMessageController) => {
      const messageController = container.get(ctorMessageController)

      const messageHandlersMetadata = getMessageHandlersMetadata(messageController)

      return messageHandlersMetadata.map((messageHandlerMetadata) => {
        return {
          queue: messageHandlerMetadata.queue,
          handler:
            messageController[
              messageHandlerMetadata.handlerName as keyof typeof messageHandlerMetadata
            ].bind(messageController)
        }
      })
    })

    return resolvedHandlers.flat()
  }

  buildRpcController(
    rpcControllers: Array<Class<any>>,
    container: Container
  ): { queue: string; rpcController: Class<any> } {
    const queue = getRpcControllerMetadata(rpcControllers[0])

    const rpcController = container.get(rpcControllers[0])

    return {
      queue,
      rpcController
    }
  }
}
