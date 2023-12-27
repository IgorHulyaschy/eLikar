import { MedicineReportDto } from '@elikar/dto'
import { Logger } from '@elikar/logger'
import { Repository } from '@elikar/typeorm'
import { injectable } from 'inversify'
import { Between, getManager } from 'typeorm'
import { MedicineReport } from './MedicineReport'

@injectable()
export class MedicineReportRepository extends Repository(MedicineReport) {
  constructor(logger: Logger) {
    super(logger)
  }

  private startOfDay(date: number): Date {
    return new Date(new Date(date).setHours(0, 0, 0, 0))
  }

  private endOfDay(date: number): Date {
    return new Date(new Date(date).setHours(23, 59, 59, 999))
  }

  async findAll(
    { nurseId, date }: MedicineReportDto.GetMedicineReports,
    em = getManager()
  ): Promise<MedicineReport[]> {
    return em
      .createQueryBuilder(MedicineReport, 'mr')
      .select()
      .where(`mr.nurseId = :nurseId`, { nurseId })
      .andWhere({
        createdAt: Between(this.startOfDay(date), this.endOfDay(date))
      })
      .getMany()
  }
}
