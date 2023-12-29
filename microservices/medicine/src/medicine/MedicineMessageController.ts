import { MedicineRegisterCommand, MedicineCountUpdateCommand } from '@elikar/commands'
import { messageController, messageHandler } from '@elikar/application'
import { MedicineService } from './MedicineService'

@messageController()
export class MedicineMessageController {
  constructor(private readonly service: MedicineService) {}

  @messageHandler(MedicineRegisterCommand)
  onCreate(cmd: MedicineRegisterCommand): Promise<void> {
    return this.service.create(cmd.payload)
  }

  @messageHandler(MedicineCountUpdateCommand)
  onUpdate(cmd: MedicineCountUpdateCommand): Promise<void> {
    return this.service.updateMedicineCount(cmd.payload)
  }
}
