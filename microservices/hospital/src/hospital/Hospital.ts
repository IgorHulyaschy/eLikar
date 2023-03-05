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

  constructor(
    dto?: HospitalDto.CreateHospital & { id?: string; private?: string; verified?: boolean }
  ) {
    if (dto) {
      this.id = dto.id ?? randomUUID()
      this.name = dto.name
      this.address = dto.address
      this.email = dto.email
      this.password = dto.password
      this.private = dto.private
      this.verified = dto.verified ?? false
    }
  }

  static create(data: HospitalDto.CreateHospital): Hospital {
    return new Hospital(data)
  }
}
