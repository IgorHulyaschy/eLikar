import { DomainApplication } from '@elikar/application'
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
    private readonly typeorm: TypeormProvider
  ) {
    super({ name, rpcServer })
  }

  async init(): Promise<void> {
    await this.amqpServer.bootstrap()
    await Promise.all([this.rpcServer.bootstrap(), this.typeorm.bootstrap()])
  }
}
