import { MedicineCountUpdateCommand, MedicineRegisterCommand } from '@elikar/commands'
import { MedicineDto } from '@elikar/dto'
import { MessageClient } from '@elikar/message-client'
import { injectable } from 'inversify'
import { MedicineProxy } from '../proxy'

@injectable()
export class MedicineService {
  constructor(
    private readonly messageClient: MessageClient,
    private readonly proxy: MedicineProxy
  ) {}

  async create(
    dto: Omit<MedicineDto.MedicineRegister, 'hospitalId'>,
    hospitalId: string
  ): Promise<void> {
    return this.messageClient.emit(new MedicineRegisterCommand({ ...dto, hospitalId }))
  }

  async update(dto: MedicineDto.MedicineUpdateCount): Promise<void> {
    return this.messageClient.emit(new MedicineCountUpdateCommand(dto))
  }

  getAll(hospitalId: string): Promise<MedicineDto.Medicine[]> {
    return this.proxy.getAll(hospitalId)
  }
}
