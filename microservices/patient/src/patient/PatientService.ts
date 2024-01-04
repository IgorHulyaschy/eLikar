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

  async create(dto: PatientDto.CreatePatient): Promise<PatientDto.Patient> {
    const patient = Patient.create(dto)
    return await this.repository.save(patient)
  }

  async getListOfPatients(dto: PatientDto.GetListOfPatients): Promise<PatientDto.Patient[]> {
    const patients = await this.repository.findAllByHospitalId(dto)
    if (!patients.length) return []

    return patients.map((p) => this.mapper.toDto(p))
  }

  async get(id: string): Promise<PatientDto.Patient> {
    const patient = await this.repository.findOne({ id })
    if (!patient) throw new Error()

    return this.mapper.toDto(patient)
  }

  async getByPhone(phone: string): Promise<PatientDto.Patient | null> {
    const res = await this.repository.findAllByPhone(phone)
    if (!res.length) return null
    return res[0]
  }
}
