import { module } from '@elikar/module'
import { NurseProxy } from './NurseProxy'

@module({
  deps: {
    services(container) {
      container.bind(NurseProxy).toSelf().inSingletonScope()
    }
  }
})
export class NurseModule {}
