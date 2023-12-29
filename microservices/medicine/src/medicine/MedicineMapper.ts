import { MedicineDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { Medicine } from './Medicine'

@injectable()
export class MedicineMapper {
  toDto(m: Medicine): MedicineDto.Medicine {
    return {
      id: m.id,
      count: m.count!,
      unitOfMeasurement: m.unitOfMeasurement,
      name: m.name
    }
  }
}
