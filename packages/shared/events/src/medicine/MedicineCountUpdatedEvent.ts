import { MedicineDto } from '@elikar/dto'
import { Event } from '@elikar/typeorm'

export class MedicineCountUpdatedEvent extends Event<MedicineDto.MedicineUpdatedCount> {}
