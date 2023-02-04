import { AmqpTransport } from '@elikar/amqp'
import { Logger } from '@elikar/logger'
import { TypeormProvider } from '@elikar/typeorm'
import { RpcServer } from '@elikar/rpc-server'
import { injectable } from 'inversify'

import { HospitalCommandController } from './hospital'

@injectable()
export class App {
  constructor(
    private readonly amqpServer: AmqpTransport,
    private readonly rpcServer: RpcServer<any>,
    private readonly typeorm: TypeormProvider,
    private readonly hospitalCommandController: HospitalCommandController,
    private readonly logger: Logger
  ) {}

  async initCommandRouters(): Promise<void> {
    await this.hospitalCommandController.bootstrap()
  }

  async init(): Promise<void> {
    await this.amqpServer.bootstrap()
    await Promise.all([this.rpcServer.bootstrap(), this.typeorm.bootstrap()])
  }

  async start(): Promise<void> {
    await this.init()

    await this.initCommandRouters()

    this.logger.info('Hospital domain has started')
  }
}
