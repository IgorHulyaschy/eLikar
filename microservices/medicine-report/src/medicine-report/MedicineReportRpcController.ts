import { rpcController } from '@elikar/application'
import { MedicineReportDto } from '@elikar/dto'
import { MedicineReportService } from './MedicineReportService'

@rpcController('medicine_report_rpc')
export class MedicineReportRpcController {
  constructor(private readonly service: MedicineReportService) {}

  getAll(dto: MedicineReportDto.GetMedicineReports): Promise<MedicineReportDto.MedicineReport[]> {
    return this.service.getAll(dto)
  }
}
