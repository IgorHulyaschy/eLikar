import { PatientCreateCommand } from '@elikar/commands'
import { PatientDto } from '@elikar/dto'
import { MessageClient } from '@elikar/message-client'
import { injectable } from 'inversify'
import { PatientProxy } from '../proxy/PatientProxy'

@injectable()
export class PatientService {
  constructor(
    private readonly messageClient: MessageClient,
    private readonly proxy: PatientProxy
  ) {}

  async create(
    dto: Omit<PatientDto.CreatePatient, 'hospitalId'>,
    hospitalId: string
  ): Promise<void> {
    return this.messageClient.emit(new PatientCreateCommand({ ...dto, hospitalId }))
  }

  get(id: string): Promise<PatientDto.Patient> {
    return this.proxy.get(id)
  }
}
