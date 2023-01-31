import { injectable } from 'inversify'
import Router from 'koa-joi-router'

@injectable()
export abstract class WebController {
  router = Router()

  bootstrap(): Router.Router {
    this.register()
    return this.router
  }

  get(path: string, handler: Router.Handler, ...handlers: Router.Handler[]): Router.Router {
    return this.router.get(path, handler, ...handlers)
  }

  post(path: string, handler: Router.Handler, ...handlers: Router.Handler[]): Router.Router {
    return this.router.post(path, handler, ...handlers)
  }

  put(path: string, handler: Router.Handler, ...handlers: Router.Handler[]): Router.Router {
    return this.router.put(path, handler, ...handlers)
  }

  delete(path: string, handler: Router.Handler, ...handlers: Router.Handler[]): Router.Router {
    return this.router.delete(path, handler, ...handlers)
  }

  abstract register(): void
}
