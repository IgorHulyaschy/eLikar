import { MedicalHistoryDto } from '@elikar/dto'
import { Domain } from '@elikar/typeorm'
import { randomUUID } from 'crypto'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('medical_history')
export class MedicalHistory extends Domain<MedicalHistory> {
  @PrimaryColumn()
  id!: string

  @Column()
  patientId!: string

  @Column()
  nurseId!: string

  @Column()
  diagnosis!: string

  @Column({ nullable: true })
  nurseNotes?: string

  @Column()
  createdAt!: Date

  static create(dto: MedicalHistoryDto.CreateMedicalHistory): MedicalHistory {
    const medicalHistory = new MedicalHistory()
    medicalHistory.id = randomUUID()
    medicalHistory.patientId = dto.patientId
    medicalHistory.nurseId = dto.nurseId
    medicalHistory.diagnosis = dto.diagnosis
    medicalHistory.nurseNotes = dto.nurseNotes
    medicalHistory.createdAt = new Date()
    return medicalHistory
  }

  getEntity(entity: MedicalHistory): void {
    this.id = entity.id
    this.patientId = entity.patientId
    this.nurseId = entity.nurseId
    this.diagnosis = entity.diagnosis
    this.nurseNotes = entity.nurseNotes
    this.createdAt = entity.createdAt
  }
}
