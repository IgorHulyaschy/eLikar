import { Logger } from '@elikar/logger'
import { injectable } from 'inversify'
import { MessageListener } from '@elikar/message-listener'
import { RpcServer } from '@elikar/rpc-server'

import { ApplicationBuilder } from './ApplicationBuilder'
import { ApplicationModule } from '@elikar/module'

@injectable()
export abstract class DomainApplication {
  private readonly applicationBuilder = new ApplicationBuilder()
  private readonly logger = new Logger()
  private readonly domainName: string
  readonly messageListener?: MessageListener
  readonly rpcServer?: RpcServer<any>
  constructor({
    name,
    messageListener,
    rpcServer
  }: {
    name: string
    readonly messageListener?: MessageListener
    readonly rpcServer?: RpcServer<any>
  }) {
    this.domainName = name
    this.messageListener = messageListener
    this.rpcServer = rpcServer
  }
  abstract init(): Promise<void>

  async start(ioc: ApplicationModule): Promise<void> {
    this.initControllers(ioc)
    await this.init()

    this.logger.info(
      `${this.domainName.charAt(0).toUpperCase() + this.domainName.slice(1)} domain has started`
    )
  }

  private initControllers(ioc: ApplicationModule): void {
    if (this.messageListener) {
      const handlers = this.applicationBuilder.buildMessageControllers(ioc)
      handlers.forEach((handler) => this.messageListener!.on(handler))
    }

    if (this.rpcServer) {
      const { queue, rpcController } = this.applicationBuilder.buildRpcController(ioc)

      this.rpcServer.setQueue(queue)
      this.rpcServer.setRpcController(rpcController)
    }
  }
}
