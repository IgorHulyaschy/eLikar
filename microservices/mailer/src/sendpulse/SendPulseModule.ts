import { DynamicModule } from '@elikar/module'

import { TYPES } from './constants'
import { Options } from './interfaces'
import { SendPulseService } from './SendPulseService'

export class SendPulseModule extends DynamicModule<Options> {
  register(options: Options): void {
    this.bind(SendPulseService).toSelf().inSingletonScope()
    this.bind<Options>(TYPES.Options).toConstantValue(options)
  }
}
