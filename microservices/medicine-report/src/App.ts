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
    readonly messageListener: MessageListener,
    readonly rpcServer: RpcServer<any>,
    private readonly typeorm: TypeormProvider
  ) {
    super({ name, messageListener })
  }

  async init(): Promise<void> {
    await this.typeorm.bootstrap()
    await this.amqpServer.bootstrap()
    await this.messageListener.bootstrap()
    await this.rpcServer.bootstrap()
  }
}
