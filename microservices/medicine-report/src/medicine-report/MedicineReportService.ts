import { MedicineReportDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { MedicineReport } from './MedicineReport'
import { MedicineReportRepository } from './MedicineReportRepository'

@injectable()
export class MedicineReportService {
  constructor(private readonly repository: MedicineReportRepository) {}

  async create(dto: MedicineReportDto.CreateMedicineReport): Promise<void> {
    const medicineReport = MedicineReport.create(dto)
    await this.repository.save(medicineReport)
  }
}
