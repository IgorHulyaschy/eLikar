import { AmqpTransport } from '@elikar/amqp'
import { Logger } from '@elikar/logger'
import { RpcServer } from '@elikar/rpc-server'
import { injectable } from 'inversify'

import { UserCommandController } from './user'

@injectable()
export class App {
  constructor(
    private readonly amqpServer: AmqpTransport,
    private readonly rpcServer: RpcServer<any>,
    private readonly userCommandController: UserCommandController,
    private readonly logger: Logger
  ) {}

  async initCommandRouters(): Promise<void> {
    await this.userCommandController.bootstrap()
  }

  async init(): Promise<void> {
    await this.amqpServer.bootstrap()
    await this.rpcServer.bootstrap()
  }

  async start(): Promise<void> {
    await this.init()

    await this.initCommandRouters()

    this.logger.info('User domain has started')
  }
}
