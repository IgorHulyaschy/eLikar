import { Logger } from '@elikar/logger'
import { Repository } from '@elikar/typeorm'
import { injectable } from 'inversify'
import { getManager } from 'typeorm'
import { Nurse } from './Nurse'

@injectable()
export class NurseRepository extends Repository(Nurse) {
  constructor(logger: Logger) {
    super(logger)
  }

  findAll(em = getManager()): Promise<Nurse[]> {
    return em.find(Nurse)
  }
}
