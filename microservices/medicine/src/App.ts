import { DomainApplication } from '@elikar/application'
import { MessageListener } from '@elikar/message-listener'
import { AmqpTransport } from '@elikar/amqp'
import { TypeormProvider } from '@elikar/typeorm'
import { RpcServer } from '@elikar/rpc-server'
import { inject, injectable } from 'inversify'

import { TYPES } from './AppModule'

@injectable()
export class App extends DomainApplication {
  constructor(
    @inject(TYPES.Options) { name }: { name: string },
    private readonly amqpServer: AmqpTransport,
    readonly rpcServer: RpcServer<any>,
    readonly messageListener: MessageListener,
    private readonly typeorm: TypeormProvider
  ) {
    super({ name, messageListener })
  }

  async init(): Promise<void> {
    await this.amqpServer.bootstrap()
    await Promise.all([
      this.typeorm.bootstrap(),
      this.messageListener.bootstrap(),
      this.rpcServer.bootstrap()
    ])
  }
}
