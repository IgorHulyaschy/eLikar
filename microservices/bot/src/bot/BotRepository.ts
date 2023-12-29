import { injectable } from 'inversify'
import { Repository } from '@elikar/typeorm'
import { Logger } from '@elikar/logger'
import { Bot } from './Bot'

@injectable()
export class BotRepository extends Repository(Bot) {
  constructor(logger: Logger) {
    super(logger)
  }
}
