import { injectable } from 'inversify'
import BunyanLoggerLib from 'bunyan'
import { Tracing } from '@elikar/als'

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

  private get bunyan(): BunyanLoggerLib {
    const traceId = Tracing.getTrace()
    return traceId ? this.logger.child({ traceId }) : this.logger
  }

  debug(...params: any[]): void {
    this.bunyan.debug(params)
  }

  error(...params: any[]): void {
    this.bunyan.error(params)
  }

  info(...params: any[]): void {
    this.bunyan.info(params)
  }
}
