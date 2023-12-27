import { PatientCreateCommand } from '@elikar/commands'
import { PatientDto } from '@elikar/dto'
import { MessageClient } from '@elikar/message-client'
import { injectable } from 'inversify'

@injectable()
export class PatientService {
  constructor(private readonly messageClient: MessageClient) {}

  async create(
    dto: Omit<PatientDto.CreatePatient, 'hospitalId'>,
    hospitalId: string
  ): Promise<void> {
    return this.messageClient.emit(new PatientCreateCommand({ ...dto, hospitalId }))
  }
}
