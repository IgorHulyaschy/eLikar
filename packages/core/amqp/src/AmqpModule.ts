import { DynamicModule } from '@elikar/module'
import { AmqpTransport } from './AmqpTransport'
import { TYPES } from './constants'
import { Options } from './interfaces'

export class AmqpModule extends DynamicModule<Options> {
  register(options: Options): void {
    this.bind<Options>(TYPES.Options).toConstantValue(options)
    this.bind(AmqpTransport).toSelf().inSingletonScope()
  }
}
