import { MedicineDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { Medicine } from './Medicine'
import { MedicineRepository } from './MedicineRepository'

@injectable()
export class MedicineService {
  constructor(private readonly repository: MedicineRepository) {}

  create(dto: MedicineDto.MedicineRegister): Promise<void> {
    const medicine = Medicine.create(dto)
    return this.repository.save(medicine)
  }
}
