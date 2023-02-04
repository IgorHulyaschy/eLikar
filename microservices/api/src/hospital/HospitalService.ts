import { HospitalCreateCommand } from '@elikar/commands'
import { HospitalDto } from '@elikar/dto'
import { MessageClient } from '@elikar/message-client'
import { injectable } from 'inversify'

import { HospitalProxy } from './HospitalProxy'

@injectable()
export class HospitalService {
  constructor(
    private readonly proxy: HospitalProxy,
    private readonly messageClient: MessageClient
  ) {}

  async create(data: HospitalDto.CreateHospital): Promise<void> {
    await this.proxy.validateCreation(data)
    return this.messageClient.emit(new HospitalCreateCommand(data))
  }
}
