import 'reflect-metadata'
import { Class } from 'type-fest'
import Router from 'koa-joi-router'
import { Middleware } from '@elikar/middlewares'
import { ApplicationModule } from '@elikar/module'

import {
  getHttpHandlersMetadata,
  getMessageHandlersMetadata,
  getOnCallbackQuery,
  getOnMessageMetadata,
  getOnTextMetadata,
  getRpcControllerMetadata,
  getWebControllersMetadata
} from './decorators'
import { getMiddlewaresMetadata } from './decorators/middleware'

export class ApplicationBuilder {
  buildHttpControllers(ioc: ApplicationModule): Router.Router[] {
    return ioc.getWebControllers().map((ctor) => {
      const router = Router()
      const controller = ioc.get(ctor)

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
          const middleware = ioc.get<Middleware>(constructor)
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
    ioc: ApplicationModule
  ): Array<{ queue: string; handler: (data: any) => Promise<any> }> {
    const resolvedHandlers = ioc.getMessageControllers().map((ctorMessageController) => {
      const messageController = ioc.get(ctorMessageController)

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

  buildRpcController(ioc: ApplicationModule): { queue: string; rpcController: Class<any> } {
    const queue = getRpcControllerMetadata(ioc.getRpcControllers()[0])

    const rpcController = ioc.get(ioc.getRpcControllers()[0])

    return {
      queue,
      rpcController
    }
  }

  buildBotController(ioc: ApplicationModule): {
    controller: Class<any>
    onTextMetadata: Array<{
      regExp: RegExp
      methodName: string
    }>
    onMessageMetadata: Array<{ message: string; methodName: string }>
    onCBQueryMetadata: string
  } {
    const controller = ioc.get(ioc.globalBotControllers[0])

    const onTextMetadata = getOnTextMetadata(controller)
    const onMessageMetadata = getOnMessageMetadata(controller)
    const onCBQueryMetadata = getOnCallbackQuery(controller)

    return {
      controller,
      onTextMetadata,
      onMessageMetadata,
      onCBQueryMetadata
    }
  }
}
