import { Logger } from '@elikar/logger'
import { MessageListener } from '@elikar/message-listener'
import { injectable } from 'inversify'
import { UserCommandRouter } from './user/UserCommandRouter'

@injectable()
export class App {
  constructor(
    private readonly messageListener: MessageListener,
    private readonly userCommandRouter: UserCommandRouter,
    private readonly logger: Logger
  ) {}

  async initCommandRouters(): Promise<void> {
    await this.userCommandRouter.bootstrap()
  }

  async init(): Promise<void> {
    await this.messageListener.bootstrap()
  }

  async start(): Promise<void> {
    await this.initCommandRouters()
    await this.init()

    this.logger.info('User domain has started')
  }
}
