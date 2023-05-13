import { DomainApplication } from '@elikar/application'
import { AmqpTransport } from '@elikar/amqp'
import { RpcServer } from '@elikar/rpc-server'
import { inject, injectable } from 'inversify'
import { TYPES } from './AppModule'

@injectable()
export class App extends DomainApplication {
  constructor(
    @inject(TYPES.Options) { name }: { name: string },
    private readonly amqpServer: AmqpTransport,
    readonly rpcServer: RpcServer<any>
  ) {
    super({ name })
  }

  async init(): Promise<void> {
    await this.amqpServer.bootstrap()
    await this.rpcServer.bootstrap()
  }
}
