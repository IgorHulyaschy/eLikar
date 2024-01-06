import { HospitalCreateCommand, HospitalSendRegistrationLettersCommand } from '@elikar/commands'
import { HospitalDto } from '@elikar/dto'
import { MessageClient } from '@elikar/message-client'
import { injectable } from 'inversify'

import { HospitalProxy } from '../proxy'
import { PatientProxy } from '../proxy/PatientProxy'

@injectable()
export class HospitalService {
  constructor(
    private readonly proxy: HospitalProxy,
    private readonly patientProxy: PatientProxy,
    private readonly messageClient: MessageClient
  ) {}

  async create(data: HospitalDto.CreateHospital): Promise<void> {
    await this.proxy.validateCreation(data)
    return this.messageClient.emit(new HospitalCreateCommand(data))
  }

  signIn(data: HospitalDto.SignIn): Promise<{ token: string }> {
    return this.proxy.signIn(data)
  }

  validateToken(token: string): Promise<HospitalDto.Hospital | null> {
    return this.proxy.validateToken(token)
  }

  async sendRegistrationLettersForNurses(emails: string[], hospitalId: string): Promise<void> {
    return this.messageClient.emit(
      new HospitalSendRegistrationLettersCommand({ emails, hospitalId })
    )
  }

  getNurseDiagnosisHistory(nurseId: string): Promise<any> {
    return this.patientProxy.getNurseDiagnosisHistory(nurseId)
  }
}
