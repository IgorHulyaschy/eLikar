import { NurseDto } from '@elikar/dto'
import { randomUUID } from 'crypto'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('nurse')
export class Nurse {
  @PrimaryColumn()
  id!: string

  @Column()
  fname!: string

  @Column()
  lname!: string

  @Column()
  hospitalId!: string

  @Column({ unique: true })
  email!: string

  @Column()
  password!: string

  @Column({ unique: true, nullable: true })
  tgId?: string

  @Column({ default: true })
  isActive!: boolean

  @Column()
  phoneNumber!: string

  static create(dto: NurseDto.CreateNurse): Nurse {
    const nurse = new Nurse()
    nurse.id = randomUUID()
    nurse.email = dto.email
    nurse.fname = dto.fname
    nurse.hospitalId = dto.hospitalId
    nurse.lname = dto.lname
    nurse.password = dto.password
    nurse.phoneNumber = dto.phone

    return nurse
  }

  setTgId(tgId: string): void {
    this.tgId = tgId
  }
}
