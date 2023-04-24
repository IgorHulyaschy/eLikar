import { messageController, messageHandler } from '@elikar/application'
import { MedicineRegisterCommand } from '@elikar/commands'
import { MedicineService } from './MedicineService'

@messageController()
export class MedicineMessageController {
  constructor(private readonly service: MedicineService) {}

  @messageHandler(MedicineRegisterCommand)
  onCreate(cmd: MedicineRegisterCommand): Promise<void> {
    return this.service.create(cmd.payload)
  }
}
