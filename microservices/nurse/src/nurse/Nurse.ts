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
  tgId!: string

  @Column({ default: true })
  isActive!: boolean

  @Column()
  phoneNumber!: string
}
