import { BotDto } from '@elikar/dto'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('bot')
export class Bot {
  @PrimaryColumn()
  id!: string

  @Column()
  email!: string

  static create(dto: BotDto.Bot): Bot {
    const bot = new Bot()
    bot.id = dto.id
    bot.email = dto.email

    return bot
  }
}
