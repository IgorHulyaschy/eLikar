import { Aggregate } from '@elikar/typeorm'
import { MedicineRegisteredEvent } from '@elikar/events'
import { MedicineDto } from '@elikar/dto'

export class Medicine extends Aggregate<MedicineRegisteredEvent> {
  name!: string
  unitOfMeasurement!: string
  count?: number

  on(event: MedicineRegisteredEvent): void {
    if (event instanceof MedicineRegisteredEvent) {
      this.name = event.payload.name
      this.unitOfMeasurement = event.payload.unitOfMeasurement
      this.count = 0
    }
  }

  static create(dto: MedicineDto.MedicineRegistered): Medicine {
    return new Medicine().addEvents(new MedicineRegisteredEvent(dto))
  }
}
