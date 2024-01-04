import { PatientCreateCommand } from '@elikar/commands'
import { PatientDto } from '@elikar/dto'
import { MessageClient } from '@elikar/message-client'
import { randomUUID } from 'crypto'
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
  ): Promise<string> {
    const id = randomUUID()
    this.messageClient.emit(new PatientCreateCommand({ ...dto, hospitalId, id }))
    return id
  }

  get(id: string): Promise<PatientDto.Patient> {
    return this.proxy.get(id)
  }

  getMedicalHistory(patientId: string): Promise<void> {
    return this.proxy.getMedicalHistory(patientId)
  }

  getByPhone(phone: string): Promise<PatientDto.Patient | null> {
    return this.proxy.getByPhone(phone)
  }
}
