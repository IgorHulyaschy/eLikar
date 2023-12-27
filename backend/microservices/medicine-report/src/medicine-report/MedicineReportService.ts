import { MedicineReportDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { MedicineReport } from './MedicineReport'
import { MedicineReportMapper } from './MedicineReportMapper'
import { MedicineReportRepository } from './MedicineReportRepository'

@injectable()
export class MedicineReportService {
  constructor(
    private readonly repository: MedicineReportRepository,
    private readonly mapper: MedicineReportMapper
  ) {}

  async create(dto: MedicineReportDto.CreateMedicineReport): Promise<void> {
    const medicineReport = MedicineReport.create(dto)
    await this.repository.save(medicineReport)
  }

  async getAll(
    dto: MedicineReportDto.GetMedicineReports
  ): Promise<MedicineReportDto.MedicineReport[]> {
    const reports = await this.repository.findAll(dto)
    if (!reports.length) return []

    return reports.map((r) => this.mapper.toDto(r))
  }
}
