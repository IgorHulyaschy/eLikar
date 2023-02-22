import { Container, injectable } from 'inversify'
import { GlobalCatcher, TraceMiddleware } from '@elikar/middlewares'
import { Logger } from '@elikar/logger'
import Koa from 'koa'
import koaBody from 'koa-body'
import cors from '@koa/cors'
import Router from 'koa-router'
import { Class } from 'type-fest'

import { ApplicationBuilder } from './ApplicationBuilder'

@injectable()
export abstract class KoaApplication extends Koa {
  private readonly port: number
  private readonly applicationBuilder = new ApplicationBuilder()
  private readonly logger = new Logger()
  constructor({ port }: { port: number }) {
    super()
    this.port = port
  }

  abstract init(): Promise<void>

  async start({
    webControllers,
    container
  }: {
    webControllers: Array<Class<any>>
    container: any
  }): Promise<void> {
    await this.init()

    this.use(cors())
    this.use(koaBody())
    this.use(GlobalCatcher.use)
    this.use(TraceMiddleware.use)

    this.initControllers(webControllers, container)
    this.listen(this.port, () => {
      this.logger.info(`Koa web server started on port ${this.port}`)
    })
  }

  private initControllers(webControllers: Array<Class<any>>, container: Container): void {
    const router = new Router()

    const routers = this.applicationBuilder.buildHttpControllers(webControllers, container)
    routers.forEach((r) => router.use('/api', r.middleware()))

    this.use(router.middleware())
  }
}
