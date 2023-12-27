import { IModule, module } from '@elikar/module'

import { TYPES } from './constants'
import { Options } from './interfaces'
import { SendPulseService } from './SendPulseService'

@module()
export class SendPulseModule {
  static register(options: Options): IModule {
    return {
      deps: {
        services(container) {
          container.bind(SendPulseService).toSelf().inSingletonScope()
          container.bind<Options>(TYPES.Options).toConstantValue(options)
        }
      }
    }
  }
}
