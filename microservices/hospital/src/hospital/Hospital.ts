import { PrimaryColumn, Column, Entity } from 'typeorm'
import { HospitalDto } from '@elikar/dto'
import { randomUUID } from 'crypto'
import { Domain } from '@elikar/typeorm'

@Entity('hospital')
export class Hospital extends Domain<Hospital> {
  @PrimaryColumn()
  id!: string

  @Column()
  name!: string

  @Column({
    type: 'jsonb'
  })
  address!: HospitalDto.HospitalAddress

  @Column({ default: false })
  verified!: boolean

  @Column({ unique: true })
  email!: string

  @Column()
  password!: string

  @Column({ nullable: true })
  private?: string

  static create(dto: HospitalDto.CreateHospital): Hospital {
    const hospital = new Hospital()
    hospital.id = randomUUID()
    hospital.name = dto.name
    hospital.address = dto.address
    hospital.email = dto.email
    hospital.password = dto.password
    return hospital
  }

  getEntity(entity: Hospital): void {
    this.id = entity.id
    this.name = entity.name
    this.address = entity.address
    this.email = entity.email
    this.password = entity.password
    this.private = entity.private
    this.verified = entity.verified
  }
}
