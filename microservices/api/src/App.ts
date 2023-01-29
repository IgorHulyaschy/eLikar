import { MessageClient } from '@elikar/message-client'
import { inject, injectable } from 'inversify'
import { Logger } from '@elikar/logger'
import Router from 'koa-router'
import cors from '@koa/cors'
import body from 'koa-body'
import Koa from 'koa'

import { Options, TYPES } from './AppModule'
import { UserRouter } from './user'

@injectable()
export class App extends Koa {
  private readonly port: number
  constructor(
    @inject(TYPES.Options) options: Options,
    private readonly messageClient: MessageClient,
    private readonly userRouter: UserRouter,
    private readonly logger: Logger
  ) {
    super()
    this.port = options.port
  }

  private async init(): Promise<void> {
    await this.messageClient.bootstrap()
  }

  private initRouters(): void {
    const router = new Router()

    router.use('', this.userRouter.bootstrap().middleware())

    this.use(router.middleware())
  }

  async start(): Promise<void> {
    await this.init()

    this.use(cors())
    this.use(body())

    this.initRouters()

    this.listen(this.port, () => {
      this.logger.info(`Koa web server started on port ${this.port}`)
    })
  }
}
