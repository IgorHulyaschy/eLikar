import { MedicineReportDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { MedicineReport } from './MedicineReport'

@injectable()
export class MedicineReportMapper {
  toDto(mr: MedicineReport): MedicineReportDto.MedicineReport {
    return {
      medicineId: mr.medicineId,
      nurceId: mr.nurseId,
      count: mr.count,
      patientId: mr.patientId,
      createdAt: new Date(mr.createdAt).getTime()
    }
  }
}
