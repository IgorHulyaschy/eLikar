import { Aggregate } from '@elikar/typeorm'
import { MedicineRegisteredEvent } from '@elikar/events'

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
}
