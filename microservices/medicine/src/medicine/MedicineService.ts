import { MedicineDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { Medicine } from './Medicine'
import { MedicineMapper } from './MedicineMapper'
import { MedicineRepository } from './MedicineRepository'

@injectable()
export class MedicineService {
  constructor(
    private readonly repository: MedicineRepository,
    private readonly mapper: MedicineMapper
  ) {}

  create(dto: MedicineDto.MedicineRegister): Promise<void> {
    const medicine = Medicine.create(dto)
    return this.repository.save(medicine)
  }

  async updateMedicineCount({ id, count }: MedicineDto.MedicineUpdateCount): Promise<void> {
    const medicine = await this.repository.findOne({ aggregateId: id })
    if (!medicine) return

    return this.repository.save(medicine.updateMedicineCount({ count }))
  }

  async list(hospitalId: string): Promise<MedicineDto.Medicine[]> {
    const medicines = await this.repository.findAll({ hospitalId })
    if (!medicines.length) return []

    return medicines.map(this.mapper.toDto)
  }
}
