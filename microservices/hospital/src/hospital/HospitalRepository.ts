/* eslint-disable @typescript-eslint/no-useless-constructor */
import { injectable } from 'inversify'
import { Hospital } from './Hospital'
import { Repository } from '@elikar/typeorm'
import { Logger } from '@elikar/logger'

@injectable()
export class HospitalRepository extends Repository<Hospital>(Hospital) {
  constructor(logger: Logger) {
    super(logger)
  }
}
