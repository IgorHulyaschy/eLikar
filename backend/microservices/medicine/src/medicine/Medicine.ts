import { Aggregate } from '@elikar/typeorm'
import { MedicineCountUpdatedEvent, MedicineRegisteredEvent } from '@elikar/events'
import { MedicineDto } from '@elikar/dto'

export class Medicine extends Aggregate<MedicineRegisteredEvent | MedicineCountUpdatedEvent> {
  name!: string
  unitOfMeasurement!: string
  count?: number

  on(event: MedicineRegisteredEvent | MedicineCountUpdatedEvent): void {
    if (event instanceof MedicineRegisteredEvent) {
      this.name = event.payload.name
      this.unitOfMeasurement = event.payload.unitOfMeasurement
      this.count = 0
    }
    if (event instanceof MedicineCountUpdatedEvent) {
      this.count! += event.payload.count
    }
  }

  static create(dto: MedicineDto.MedicineRegister): Medicine {
    return new Medicine().addEvents(new MedicineRegisteredEvent(dto))
  }

  updateMedicineCount(dto: MedicineDto.MedicineUpdatedCount): this {
    return this.addEvents(new MedicineCountUpdatedEvent(dto))
  }
}
