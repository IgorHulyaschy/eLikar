import { MedicalHistoryDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { NurseProxy } from '../nurse'
import { PatientService } from '../patient/PatientService'
import { MedicalHistory } from './MedicalHistory'
import { MedicalHistoryRepository } from './MedicalHistoryRepository'

@injectable()
export class MedicalHistoryService {
  constructor(
    private readonly repository: MedicalHistoryRepository,
    private readonly patientService: PatientService,
    private readonly nurseService: NurseProxy
  ) {}

  async create(dto: MedicalHistoryDto.CreateMedicalHistory): Promise<void> {
    const mh = MedicalHistory.create(dto)
    await this.repository.save(mh)
  }

  async getFullHistoryOfPatient(patientId: string): Promise<any[]> {
    const response = await this.repository.findHistory(patientId)
    const patient = await this.patientService.get(patientId)
    const nurses = await this.nurseService.getList()
    return Promise.all(
      response.map((r) => {
        const nurse = nurses.find((n) => n.id === r.nurseId)
        return {
          ...r,
          nurse,
          patient
        }
      })
    )
  }

  async getNurseDiagnosisHistory(nurseId: string): Promise<any> {
    const response = await this.repository.findNurseHistory(nurseId)
    const nurses = await this.nurseService.getList()
    return {
      history: await Promise.all(
        response.map(async (h) => {
          const patient = await this.patientService.get(h.patientId)
          return {
            ...h,
            patient
          }
        })
      ),
      nurse: nurses.find((n) => n.id === nurseId)
    }
  }
}
