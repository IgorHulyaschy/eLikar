import { DynamicModule } from '@elikar/module'

import { BcryptService } from './BcryptService'
import { TYPES } from './constants'
import { Options } from './interfaces'

export class BcryptModule extends DynamicModule<Options> {
  register(options: Options): void {
    this.bind(BcryptService).toSelf().inSingletonScope()
    this.bind<Options>(TYPES.Options).toConstantValue(options)
  }
}
