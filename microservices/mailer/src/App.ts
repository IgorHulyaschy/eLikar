import { AmqpTransport } from '@elikar/amqp'
import { Logger } from '@elikar/logger'
import { RpcServer } from '@elikar/rpc-server'
import { injectable } from 'inversify'

@injectable()
export class App {
  constructor(
    private readonly logger: Logger,
    private readonly rpcServer: RpcServer<any>,
    private readonly amqpServer: AmqpTransport
  ) {}

  async init(): Promise<void> {
    await this.amqpServer.bootstrap()
    await this.rpcServer.bootstrap()
  }

  async start(): Promise<void> {
    await this.init()
    this.logger.info('Mailer domain has started')
  }
}
