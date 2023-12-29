import { MedicineReportDto } from '@elikar/dto'

export class MedicineReportRpcSchema {
  queueName = 'medicine_report_rpc'
  getAll!: (
    dto: MedicineReportDto.GetMedicineReports
  ) => Promise<MedicineReportDto.MedicineReport[]>
}
