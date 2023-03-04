import { inject, injectable } from 'inversify'
import { DomainApplication } from '@elikar/application'
import { BotProvider } from '@elikar/bot-provider'

import { TYPES } from './AppModule'

@injectable()
export class App extends DomainApplication {
  constructor(
    @inject(TYPES.Options) { name }: { name: string },
    readonly botProvider: BotProvider
  ) {
    super({ name, botProvider })
  }

  async init(): Promise<void> {}
}
