import { IModule, Module } from '@elikar/module'
import { Logger } from './Logger'

export class LoggerModule extends Module {
  register(): IModule {
    return {
      deps: {
        services(container) {
          container.bind(Logger).toSelf().inSingletonScope()
        }
      }
    }
  }
}
