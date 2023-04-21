import { injectable } from 'inversify'
import { AggregateRepository, createAggregateEntity } from '@elikar/typeorm'
import { Medicine } from './Medicine'
import { MedicineRegisteredEvent } from '@elikar/events'

export const MedicineEntity = createAggregateEntity('medicine')

@injectable()
export class MedicineRepository extends AggregateRepository(
  Medicine,
  [MedicineRegisteredEvent],
  'medicine'
) {}
