import { Module } from '@elikar/module'
import { Logger } from './Logger'

export class LoggerModule extends Module {
  register(): void {
    this.bind(Logger).toSelf().inSingletonScope()
  }
}
