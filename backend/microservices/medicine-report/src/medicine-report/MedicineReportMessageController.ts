import { messageController, messageHandler } from '@elikar/application'
import { MedicineReportCreateCommand } from '@elikar/commands'
import { MedicineReportService } from './MedicineReportService'

@messageController()
export class MedicineReportMessageController {
  constructor(private readonly service: MedicineReportService) {}

  @messageHandler(MedicineReportCreateCommand)
  onCreate(cmd: MedicineReportCreateCommand): Promise<void> {
    return this.service.create(cmd.payload)
  }
}
