import { PatientDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { Patient } from './Patient'
import { PatientMapper } from './PatientMapper'
import { PatientRepository } from './PatientRepository'

@injectable()
export class PatientService {
  constructor(
    private readonly repository: PatientRepository,
    private readonly mapper: PatientMapper
  ) {}

  async create(dto: PatientDto.CreatePatient): Promise<void> {
    const patient = Patient.create(dto)
    await this.repository.save(patient)
  }

  async getListOfPatients(dto: PatientDto.GetListOfPatients): Promise<PatientDto.Patient[]> {
    const patients = await this.repository.findAllByHospitalId(dto)
    if (!patients.length) return []

    return patients.map((p) => this.mapper.toDto(p))
  }
}
