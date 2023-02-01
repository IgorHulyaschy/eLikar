import { Module } from '@elikar/module'
import { RpcClient } from './RpcClient'

export class RpcClientModule extends Module {
  register(): void {
    this.bind(RpcClient).toSelf().inSingletonScope()
  }
}
