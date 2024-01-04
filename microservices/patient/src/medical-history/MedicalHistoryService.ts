import { MedicalHistoryDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { MedicalHistory } from './MedicalHistory'
import { MedicalHistoryRepository } from './MedicalHistoryRepository'

@injectable()
export class MedicalHistoryService {
  constructor(private readonly repository: MedicalHistoryRepository) {}

  async create(dto: MedicalHistoryDto.CreateMedicalHistory): Promise<void> {
    const mh = MedicalHistory.create(dto)
    await this.repository.save(mh)
  }

  async getFullHistoryOfPatient(patientId: string): Promise<MedicalHistoryDto.MedicalHistory[]> {
    const response = await this.repository.findHistory(patientId)
    return response
  }
}
