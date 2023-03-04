import { Logger } from '@elikar/logger'
import { injectable } from 'inversify'
import { MessageListener } from '@elikar/message-listener'
import { RpcServer } from '@elikar/rpc-server'

import { ApplicationBuilder } from './ApplicationBuilder'
import { ApplicationModule } from '@elikar/module'
import { BotProvider } from '@elikar/bot-provider'

@injectable()
export abstract class DomainApplication {
  private readonly applicationBuilder = new ApplicationBuilder()
  private readonly logger = new Logger()
  private readonly domainName: string
  readonly messageListener?: MessageListener
  readonly rpcServer?: RpcServer<any>
  readonly botProvider?: BotProvider
  constructor({
    name,
    messageListener,
    rpcServer,
    botProvider
  }: {
    name: string
    readonly messageListener?: MessageListener
    readonly rpcServer?: RpcServer<any>
    readonly botProvider?: BotProvider
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

    if (this.botProvider) {
      const { controller, onTextMetadata, onMessageMetadata } =
        this.applicationBuilder.buildBotController(ioc)

      this.botProvider.buildOnTextHandlers(onTextMetadata, controller)
      this.botProvider.buildOnMessageHandlers(onMessageMetadata, controller)
    }
  }
}
