import { Repository } from '@elikar/typeorm'
import { injectable } from 'inversify'
import { MedicineReport } from './MedicineReport'

@injectable()
export class MedicineReportRepository extends Repository(MedicineReport) {}
