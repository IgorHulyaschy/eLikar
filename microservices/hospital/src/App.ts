import { AmqpTransport } from '@elikar/amqp'
import { TypeormProvider } from '@elikar/typeorm'
import { RpcServer } from '@elikar/rpc-server'
import { inject, injectable } from 'inversify'
import { DomainApplication } from '@elikar/application'

import { MessageListener } from '@elikar/message-listener'
import { TYPES } from './AppModule'

@injectable()
export class App extends DomainApplication {
  constructor(
    @inject(TYPES.Options) { name }: { name: string },
    private readonly amqpServer: AmqpTransport,
    private readonly typeorm: TypeormProvider,
    messageListener: MessageListener,
    rpcServer: RpcServer<any>
  ) {
    super({ name }, messageListener, rpcServer)
  }

  async init(): Promise<void> {
    await this.amqpServer.bootstrap()
    await Promise.all([
      this.rpcServer.bootstrap(),
      this.messageListener.bootstrap(),
      this.typeorm.bootstrap()
    ])
  }
}
