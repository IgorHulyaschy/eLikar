import { injectable } from 'inversify'
import Router from 'koa-joi-router'
import { TraceMiddleware } from '@elikar/middlewares'

@injectable()
export abstract class WebController {
  router = Router()

  bootstrap(): Router.Router {
    return this.router
  }

  get(path: string, handler: Router.Handler, ...handlers: Router.Handler[]): Router.Router {
    return this.router.get(path, TraceMiddleware.middleware, handler, ...handlers)
  }

  post(path: string, handler: Router.Handler, ...handlers: Router.Handler[]): Router.Router {
    return this.router.post(path, TraceMiddleware.middleware, handler, ...handlers)
  }

  put(path: string, handler: Router.Handler, ...handlers: Router.Handler[]): Router.Router {
    return this.router.put(path, TraceMiddleware.middleware, handler, ...handlers)
  }

  delete(path: string, handler: Router.Handler, ...handlers: Router.Handler[]): Router.Router {
    return this.router.delete(path, TraceMiddleware.middleware, handler, ...handlers)
  }
}
