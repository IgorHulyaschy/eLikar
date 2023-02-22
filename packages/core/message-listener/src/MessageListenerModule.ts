import { module } from '@elikar/module'
import { MessageListener } from './MessageListener'

@module({
  deps: {
    services(local) {
      local.bind(MessageListener).toSelf().inSingletonScope()
    }
  }
})
export class MessageListenerModule {}
