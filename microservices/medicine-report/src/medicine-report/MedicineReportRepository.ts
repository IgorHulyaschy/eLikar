import { Logger } from '@elikar/logger'
import { Repository } from '@elikar/typeorm'
import { injectable } from 'inversify'
import { MedicineReport } from './MedicineReport'

@injectable()
export class MedicineReportRepository extends Repository(MedicineReport) {
  constructor(logger: Logger) {
    super(logger)
  }
}
