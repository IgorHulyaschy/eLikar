import { Domain } from '@elikar/typeorm'
import { MedicineReportDto } from '@elikar/dto'
import { randomUUID } from 'crypto'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('medicine-report')
export class MedicineReport extends Domain<MedicineReport> {
  @PrimaryColumn()
  id!: string

  @Column()
  medicineId!: string

  @Column()
  nurseId!: string

  @Column()
  patientId!: string

  @Column()
  count!: number

  @Column({ default: new Date() })
  createdAt!: Date

  getEntity(entity: MedicineReport): void {
    this.id = entity.id
    this.medicineId = entity.medicineId
    this.nurseId = entity.nurseId
    this.count = entity.count
    this.createdAt = entity.createdAt
    this.patientId = entity.patientId
  }

  static create(dto: MedicineReportDto.CreateMedicineReport): MedicineReport {
    const medicineReport = new MedicineReport()
    medicineReport.id = randomUUID()
    medicineReport.medicineId = dto.medicineId
    medicineReport.nurseId = dto.nurceId
    medicineReport.patientId = dto.patientId
    medicineReport.count = dto.count
    return medicineReport
  }
}
