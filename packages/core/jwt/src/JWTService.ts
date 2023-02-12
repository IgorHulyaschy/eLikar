/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { inject, injectable } from 'inversify'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Logger } from '@elikar/logger'

import { TYPES } from './contants'
import { Options } from './interfaces'

@injectable()
export class JWTService {
  constructor(
    @inject(TYPES.Options) private readonly config: Options,
    private readonly logger: Logger
  ) {}

  sign<T extends object>(payload: T, options: jwt.SignOptions): string {
    return jwt.sign(payload, this.config.secret, options)
  }

  verify<T extends JwtPayload>(token: string): T | void {
    try {
      return jwt.verify(token, this.config.secret) as T
    } catch (err) {
      this.logger.error('wrong-secret')
    }
  }
}
