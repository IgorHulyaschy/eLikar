import { Domain } from '@elikar/typeorm'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { PatientDto } from '@elikar/dto'
import { randomUUID } from 'crypto'

@Entity('patient')
export class Patient extends Domain<Patient> {
  @PrimaryColumn()
  id!: string

  @Column()
  fname!: string

  @Column()
  lname!: string

  @Column()
  hospitalId!: string

  @Column({ default: false })
  isHealthy!: boolean

  @Column()
  phoneNumber!: string

  @Column()
  diagnosis!: string

  static create(dto: PatientDto.CreatePatient): Patient {
    const patient = new Patient()
    patient.id = randomUUID()
    patient.fname = dto.fname
    patient.lname = dto.lname
    patient.diagnosis = dto.diagnosis
    patient.hospitalId = dto.hospitalId
    patient.phoneNumber = dto.phoneNumber

    return patient
  }

  getEntity(entity: Patient): void {
    this.id = entity.id
    this.diagnosis = entity.diagnosis
    this.fname = entity.fname
    this.lname = entity.lname
    this.phoneNumber = entity.phoneNumber
    this.isHealthy = entity.isHealthy
    this.hospitalId = entity.hospitalId
  }
}
