import { ElectronicQueueDto } from '@elikar/dto'
import { Logger } from '@elikar/logger'
import { Repository } from '@elikar/typeorm'
import { injectable } from 'inversify'
import { getManager } from 'typeorm'
import { ElectronicQueue } from './ElectronicQueue'

@injectable()
export class ElectronicQueueRepository extends Repository(ElectronicQueue) {
  constructor(logger: Logger) {
    super(logger)
  }

  async findFreeSlots(
    dto: { hospitalId: string; nurseId: string; timeFrom: number },
    em = getManager()
  ): Promise<
    Array<{
      id: string
      hospitalId: string
      nurseId: string
      patientId: string
      status: ElectronicQueueDto.Status
      dayOfMonth: Date
      bookedTime: string
    }>
  > {
    const result = await em.query(`
      SELECT *
      FROM electronic_queue
      WHERE "hospitalId" = '${dto.hospitalId}'
      AND "nurseId" = '${dto.nurseId}'
      AND "dayOfMonth" > to_timestamp(${dto.timeFrom / 1000})
    `)
    return result
  }

  delete(queueId: string, em = getManager()): Promise<void> {
    return em.query(`
      DELETE FROM electronic_queue
      WHERE "id" = '${queueId}'
    `)
  }
}
