import { module } from '@elikar/module'

import { MessageClient } from './MessageClient'

@module({
  deps: {
    services(container) {
      container.bind(MessageClient).toSelf().inSingletonScope()
    }
  }
})
export class MessageClientModule {}
