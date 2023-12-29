import { injectable } from 'inversify'
import { GlobalCatcher, TraceMiddleware } from '@elikar/middlewares'
import { Logger } from '@elikar/logger'
import Koa from 'koa'
import koaBody from 'koa-body'
import cors from '@koa/cors'
import Router from 'koa-router'

import { ApplicationBuilder } from './ApplicationBuilder'
import { ApplicationModule } from '@elikar/module'

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

  async start(ioc: ApplicationModule): Promise<void> {
    await this.init()

    this.use(cors())
    this.use(koaBody())
    this.use(GlobalCatcher.use)
    this.use(TraceMiddleware.use)

    this.initControllers(ioc)
    this.listen(this.port, () => {
      this.logger.info(`Koa web server started on port ${this.port}`)
    })
  }

  private initControllers(ioc: ApplicationModule): void {
    const router = new Router()

    const routers = this.applicationBuilder.buildHttpControllers(ioc)
    routers.forEach((r) => router.use('/api', r.middleware()))

    this.use(router.middleware())
  }
}
