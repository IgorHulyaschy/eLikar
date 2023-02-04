import { AmqpTransport } from '@elikar/amqp'
import { inject, injectable } from 'inversify'
import { Logger } from '@elikar/logger'
import Router from 'koa-router'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import Koa from 'koa'

import { Options, TYPES } from './AppModule'
import { HospitalWebController } from './hospital'
// import { UserWebController } from './user'

@injectable()
export class App extends Koa {
  private readonly port: number
  constructor(
    @inject(TYPES.Options) options: Options,
    private readonly amqpServer: AmqpTransport,
    private readonly hospitalWebController: HospitalWebController,
    // private readonly userController: UserWebController,
    private readonly logger: Logger
  ) {
    super()
    this.port = options.port
  }

  private async init(): Promise<void> {
    await this.amqpServer.bootstrap()
  }

  private initControllers(): void {
    const router = new Router()

    router.use('/hospital', this.hospitalWebController.bootstrap().middleware())

    this.use(router.middleware())
  }

  async start(): Promise<void> {
    await this.init()

    this.use(cors())
    this.use(koaBody())

    this.initControllers()

    this.listen(this.port, () => {
      this.logger.info(`Koa web server started on port ${this.port}`)
    })
  }
}
