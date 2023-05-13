import { injectable } from 'inversify'
import { AggregateRepository, createAggregateEntity } from '@elikar/typeorm'
import { Medicine } from './Medicine'
import { MedicineCountUpdatedEvent, MedicineRegisteredEvent } from '@elikar/events'
import { MessageClient } from '@elikar/message-client'

export const MedicineEntity = createAggregateEntity('medicine')

@injectable()
export class MedicineRepository extends AggregateRepository<
  Medicine,
  MedicineRegisteredEvent | MedicineCountUpdatedEvent
>({
  domain: Medicine,
  aggreagteEvents: [MedicineRegisteredEvent, MedicineCountUpdatedEvent],
  entity: MedicineEntity
}) {
  constructor(messageClient: MessageClient) {
    super(messageClient)
  }

  async findAll(payload: { hospitalId: string }): Promise<Medicine[]> {
    return this.findAllByEvent(MedicineRegisteredEvent, { payload })
  }
}
