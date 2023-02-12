import { DynamicModule } from '@elikar/module'
import { TYPES } from './contants'
import { Options } from './interfaces'
import { JWTService } from './JWTService'

export class JWTModule extends DynamicModule<Options> {
  register(options: Options): void {
    this.bind(JWTService).toSelf().inSingletonScope()
    this.bind<Options>(TYPES.Options).toConstantValue(options)
  }
}
