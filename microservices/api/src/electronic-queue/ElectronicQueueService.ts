import { ElectronicQueueCreateCommand } from '@elikar/commands'
import { ElectronicQueueDto } from '@elikar/dto'
import { MessageClient } from '@elikar/message-client'
import { injectable } from 'inversify'
import { NurseProxy } from '../proxy'

@injectable()
export class ElectronicQueueService {
  constructor(
    private readonly messageClient: MessageClient,
    private readonly nurseProxy: NurseProxy
  ) {}

  create(dto: ElectronicQueueDto.CreateElectronicQueue): void {
    return this.messageClient.emit(new ElectronicQueueCreateCommand(dto))
  }

  get(dto: ElectronicQueueDto.GetElectronicQueue): Promise<
    Record<
      string,
      Record<
        string,
        {
          id: string
          hospitalId: string
          nurseId: string
          patientId: string
          status: ElectronicQueueDto.Status
          dayOfMonth: Date
          bookedTime: string
        }
      >
    >
  > {
    return this.nurseProxy.getQueue(dto)
  }

  startOverview(id: string): Promise<void> {
    return this.nurseProxy.startOverview(id)
  }
}
