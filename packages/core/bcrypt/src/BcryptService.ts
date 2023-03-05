import { inject, injectable } from 'inversify'
import bcrypt from 'bcrypt'
import { TYPES } from './constants'
import { Options } from './interfaces'

@injectable()
export class BcryptService {
  constructor(@inject(TYPES.Options) readonly config: Options) {}

  hash(stringToHash: string): Promise<string> {
    return bcrypt.hash(stringToHash, this.config.saltRounds)
  }

  compare(stringToCompare: string, hash: string): Promise<boolean> {
    console.log(stringToCompare, hash, 'alo')
    return bcrypt.compare(stringToCompare, hash)
  }
}
