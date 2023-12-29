import { Logger } from '@elikar/logger'
import { Repository } from '@elikar/typeorm'
import { injectable } from 'inversify'
import { Nurse } from './Nurse'

@injectable()
export class NurseRepository extends Repository(Nurse) {
  constructor(logger: Logger) {
    super(logger)
  }
}
