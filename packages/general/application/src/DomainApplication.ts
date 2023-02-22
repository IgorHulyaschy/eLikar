import { Logger } from '@elikar/logger'
import { Container, injectable } from 'inversify'
import { MessageListener } from '@elikar/message-listener'
import { RpcServer } from '@elikar/rpc-server'
import { Class } from 'type-fest'

import { ApplicationBuilder } from './ApplicationBuilder'

@injectable()
export abstract class DomainApplication {
  private readonly applicationBuilder = new ApplicationBuilder()
  private readonly logger = new Logger()
  private readonly domainName: string
  constructor(
    { name }: { name: string },
    readonly messageListener: MessageListener,
    readonly rpcServer: RpcServer<any>
  ) {
    this.domainName = name
  }
  abstract init(): Promise<void>

  async start(data: {
    messageControllers: Array<Class<any>>
    rpcControllers: Array<Class<any>>
    container: any
  }): Promise<void> {
    this.initControllers(data)
    await this.init()

    this.logger.info(
      `${this.domainName.charAt(0).toUpperCase() + this.domainName.slice(1)} domain has started`
    )
  }

  private initControllers({
    messageControllers,
    rpcControllers,
    container
  }: {
    messageControllers: Array<Class<any>>
    rpcControllers: Array<Class<any>>
    container: Container
  }): void {
    const handlers = this.applicationBuilder.buildMessageControllers(messageControllers, container)
    handlers.forEach((handler) => this.messageListener.on(handler))

    const { queue, rpcController } = this.applicationBuilder.buildRpcController(
      rpcControllers,
      container
    )

    this.rpcServer.setQueue(queue)
    this.rpcServer.setRpcController(rpcController)
  }
}
