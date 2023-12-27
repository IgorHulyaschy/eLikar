import { IModule, module } from '@elikar/module'
import { TYPES } from './constants'
import { Options } from './interfaces'
import { MailgunService } from './MailgunService'

@module()
export class MailgunModule {
  static register(options: Options): IModule {
    return {
      deps: {
        services(local) {
          local.bind<Options>(TYPES.Options).toConstantValue(options)
          local.bind(MailgunService).toSelf().inSingletonScope()
        }
      }
    }
  }
}
