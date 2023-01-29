import { injectable } from 'inversify'
import BunyanLoggerLib from 'bunyan'

@injectable()
export class Logger {
  private readonly logger: BunyanLoggerLib

  constructor() {
    const streams: BunyanLoggerLib.Stream[] = [
      { stream: process.stdout, level: 'info' },
      { stream: process.stdout, level: 'error' }
    ]
    this.logger = BunyanLoggerLib.createLogger({ name: 'Logger', streams })
  }

  debug(...params: any[]): void {
    this.logger.debug(params)
  }

  error(...params: any[]): void {
    this.logger.error(params)
  }

  info(...params: any[]): void {
    this.logger.info(params)
  }
}
