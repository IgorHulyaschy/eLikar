import { ElectronicQueueDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { ElectronicQueue } from './ElectronicQueue'

@injectable()
export class ElectronicQueueMapper {
  toDto(e: ElectronicQueue): ElectronicQueueDto.ElectronicQueue {
    return {
      id: e.id,
      hospitalId: e.hospitalId,
      nurseId: e.nurseId,
      patientId: e.patientId,
      status: e.status,
      dayOfMonth: e.dayOfMonth,
      bookedTime: e.bookedTime
    }
  }
}
