import { PrimaryColumn, Column, Entity } from 'typeorm'
import { HospitalDto } from '@elikar/dto'
import { randomUUID } from 'crypto'

@Entity('hospital')
export class Hospital {
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

  static create(data: HospitalDto.CreateHospital): Hospital {
    const hospital = new Hospital()
    hospital.id = randomUUID()
    hospital.name = data.name
    hospital.address = data.address
    hospital.email = data.email
    hospital.password = data.password

    return hospital
  }
}
