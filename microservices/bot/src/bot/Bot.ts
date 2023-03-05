import { BotDto } from '@elikar/dto'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('bot')
export class Bot {
  @PrimaryColumn()
  id!: string

  @Column()
  email!: string

  constructor(data?: BotDto.Bot) {
    if (data) {
      this.email = data.email
      this.id = data.id
    }
  }

  static create(dto: BotDto.Bot): Bot {
    return new Bot(dto)
  }
}
