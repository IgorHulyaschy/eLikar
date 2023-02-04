import { DynamicModule } from '@elikar/module'
import { ConnectionOptions } from 'typeorm'
import { TYPES } from './constants'
import { TypeormProvider } from './TypeormProvider'

export class TypeormModule extends DynamicModule<ConnectionOptions> {
  register(options: ConnectionOptions): void {
    this.bind(TypeormProvider).toSelf().inSingletonScope()
    this.bind<ConnectionOptions>(TYPES.Options).toConstantValue(options)
  }
}
