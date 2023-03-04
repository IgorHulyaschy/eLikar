import { IModule, module } from '@elikar/module'
import { decorate, injectable } from 'inversify'
import TelegramBot from 'node-telegram-bot-api'
import { BotProvider } from './BotProvider'
import { TYPES } from './constants'
import { Options } from './interfaces'

@module()
export class BotProviderModule {
  static register(options: Options): IModule {
    return {
      deps: {
        services(container) {
          decorate(injectable(), TelegramBot)
          container.bind(BotProvider).toSelf().inSingletonScope()
          container.bind(TYPES.Options).toConstantValue(options)
        }
      }
    }
  }
}
