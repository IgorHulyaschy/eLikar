import { MedicineRegisterCommand } from '@elikar/commands'
import { MedicineDto } from '@elikar/dto'
import { MessageClient } from '@elikar/message-client'
import { injectable } from 'inversify'

@injectable()
export class MedicineService {
  constructor(private readonly messageClient: MessageClient) {}

  async create(dto: MedicineDto.MedicineRegister): Promise<void> {
    return this.messageClient.emit(new MedicineRegisterCommand(dto))
  }
}
