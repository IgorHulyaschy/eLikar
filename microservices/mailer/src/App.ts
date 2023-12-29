import { DomainApplication } from '@elikar/application'
import { AmqpTransport } from '@elikar/amqp'
import { RpcServer } from '@elikar/rpc-server'
import { inject, injectable } from 'inversify'
import { TYPES } from './AppModule'

@injectable()
export class App extends DomainApplication {
  constructor(
    @inject(TYPES.Options) { name }: { name: string },
    readonly rpcServer: RpcServer<any>,
    private readonly amqpServer: AmqpTransport
  ) {
    super({ name, rpcServer })
  }

  async init(): Promise<void> {
    await this.amqpServer.bootstrap()
    await this.rpcServer.bootstrap()
  }
}
