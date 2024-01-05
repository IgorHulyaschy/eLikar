import { QueueEntryStatus } from './queue-entry-status'

export class QueueEntry {
  id: string
  hospitalId: string
  nurseId: string
  patientId: string
  status: QueueEntryStatus
  dayOfMonth: Date
  bookedTime: string
}
