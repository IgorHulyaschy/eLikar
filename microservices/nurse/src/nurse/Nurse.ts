import { NurseDto } from '@elikar/dto'
import { Domain } from '@elikar/typeorm'
import { randomUUID } from 'crypto'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('nurse')
export class Nurse extends Domain<Nurse> {
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

  @Column()
  position!: NurseDto.Position

  @Column()
  specialist!: NurseDto.Specialist

  static create(dto: NurseDto.CreateNurse): Nurse {
    const nurse = new Nurse()
    nurse.id = randomUUID()
    nurse.email = dto.email
    nurse.fname = dto.fname
    nurse.hospitalId = dto.hospitalId
    nurse.lname = dto.lname
    nurse.password = dto.password
    nurse.phoneNumber = dto.phoneNumber
    nurse.position = dto.position
    nurse.specialist = dto.specialist
    return nurse
  }

  setTgId(tgId: string): void {
    this.tgId = tgId
  }

  getEntity(entity: Nurse): void {
    this.id = entity.id
    this.email = entity.email
    this.fname = entity.fname
    this.hospitalId = entity.hospitalId
    this.lname = entity.lname
    this.password = entity.password
    this.phoneNumber = entity.phoneNumber
    this.isActive = entity.isActive
    this.position = entity.position
    this.specialist = entity.specialist
  }
}
