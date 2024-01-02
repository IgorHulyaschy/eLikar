import { ElectronicQueueDto } from '@elikar/dto'
import { Domain } from '@elikar/typeorm'
import { randomUUID } from 'crypto'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('electronic_queue')
export class ElectronicQueue extends Domain<ElectronicQueue> {
  @PrimaryColumn()
  id!: string

  @Column()
  hospitalId!: string

  @Column()
  nurseId!: string

  @Column()
  patientId!: string

  @Column()
  status!: ElectronicQueueDto.Status

  @Column()
  dayOfMonth!: Date

  @Column()
  bookedTime!: number

  static create(dto: ElectronicQueueDto.CreateElectronicQueue): ElectronicQueue {
    const queue = new ElectronicQueue()
    queue.id = randomUUID()
    queue.hospitalId = dto.hospitalId
    queue.nurseId = dto.nurseId
    queue.patientId = dto.patientId
    queue.status = ElectronicQueueDto.Status.BOOKED
    queue.dayOfMonth = new Date(new Date(dto.dayOfMonth).setHours(dto.bookedTime, 0, 0, 0))
    queue.bookedTime = dto.bookedTime
    return queue
  }

  getEntity(entity: ElectronicQueue): void {
    this.id = entity.id
    this.hospitalId = entity.hospitalId
    this.nurseId = entity.nurseId
    this.patientId = entity.patientId
    this.status = entity.status
    this.dayOfMonth = entity.dayOfMonth
    this.bookedTime = entity.bookedTime
  }
}
