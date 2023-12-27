import { messageController, messageHandler } from '@elikar/application'
import {
  MedicineCountUpdateCommand,
  MedicineReportCreateCommand,
  NurseMedicineReportCreateCommand
} from '@elikar/commands'
import { MessageClient } from '@elikar/message-client'
import { NurseService } from '../NurseService'

@messageController()
export class MedicineReportCreateSaga {
  constructor(
    private readonly messageClient: MessageClient,
    private readonly service: NurseService
  ) {}

  @messageHandler(NurseMedicineReportCreateCommand)
  async onMedicineReportCreate({ payload }: NurseMedicineReportCreateCommand): Promise<void> {
    const nurse = await this.service.getByTgId(payload.tgId)
    this.messageClient.emit(
      new MedicineReportCreateCommand({
        medicineId: payload.medicineId,
        patientId: payload.patientId,
        nurceId: nurse.id,
        count: payload.count
      })
    )
    this.messageClient.emit(
      new MedicineCountUpdateCommand({
        id: payload.medicineId,
        count: -payload.count
      })
    )
  }
}
