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

  constructor(data?: NurseDto.CreateNurse & { id?: string; isActive?: boolean }) {
    if (data) {
      this.id = data.id ?? randomUUID()
      this.email = data.email
      this.fname = data.fname
      this.hospitalId = data.hospitalId
      this.lname = data.lname
      this.password = data.password
      this.phoneNumber = data.phoneNumber
      this.isActive = data.isActive ?? true
    }
  }

  static create(dto: NurseDto.CreateNurse): Nurse {
    return new Nurse(dto)
  }

  setTgId(tgId: string): void {
    this.tgId = tgId
  }
}
