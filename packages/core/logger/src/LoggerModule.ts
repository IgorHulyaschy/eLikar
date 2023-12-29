import { module } from '@elikar/module'
import { Logger } from './Logger'

@module({
  deps: {
    services(local) {
      local.bind(Logger).toSelf().inSingletonScope()
    }
  }
})
export class LoggerModule {}
