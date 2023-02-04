import { HospitalCreateCommand } from '@elikar/commands'
import { MessageListener } from '@elikar/message-listener'
import { CommandController } from '@elikar/controller'
import { injectable } from 'inversify'

import { HospitalService } from './HospitalService'
import { HospitalDto } from '@elikar/dto'

@injectable()
export class HospitalCommandController extends CommandController {
  constructor(private readonly service: HospitalService, messageListener: MessageListener) {
    super(messageListener)
    this.on(HospitalCreateCommand, this.create)
  }

  create = async (data: HospitalDto.CreateHospital): Promise<void> => {
    return this.service.create(data)
  }
}
