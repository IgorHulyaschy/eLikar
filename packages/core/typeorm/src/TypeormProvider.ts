import { inject, injectable } from 'inversify'
import { ConnectionOptions, createConnection } from 'typeorm'
import { Logger } from '@elikar/logger'

import { TYPES } from './constants'

@injectable()
export class TypeormProvider {
  constructor(
    @inject(TYPES.Options) private readonly options: ConnectionOptions,
    private readonly logger: Logger
  ) {}

  async bootstrap(): Promise<void> {
    await createConnection(this.options)
    this.logger.info('Typeorm connection has bootstraped')
  }
}
