import { DynamicModule } from '@elikar/module'
import { TYPES } from './constants'
import { Options } from './interfaces'
import { RpcServer } from './RpcServer'

export class RpcServerModule<RpcShema> extends DynamicModule<Options<RpcShema>> {
  register(options: Options<RpcShema>): void {
    this.bind(RpcServer).toSelf().inSingletonScope()
    this.bind<Options<RpcShema>>(TYPES.Options).toConstantValue(options)
  }
}
