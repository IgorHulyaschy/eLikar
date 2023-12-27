import { BotDto } from '@elikar/dto'
import { Domain } from '@elikar/typeorm'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('bot')
export class Bot extends Domain<Bot> {
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

  getEntity(entity: Bot): void {
    this.id = entity.id
    this.email = entity.email
  }
}
