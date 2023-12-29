import { Event } from '@elikar/typeorm'
import { MedicineDto } from '@elikar/dto'

export class MedicineRegisteredEvent extends Event<MedicineDto.MedicineRegistered> {}
