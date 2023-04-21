import { Class } from 'type-fest'
import { Column, Entity, Index, PrimaryColumn, QueryFailedError, Unique } from 'typeorm'
import { Event } from './Event'

export function createAggregateEntity(tableName: string): Class<Event<any>> {
  @Entity(tableName)
  @Unique(['uniqueKey'])
  @Index(['id', 'version'], { unique: true })
  class AggregateEntity implements Event<any> {
    @PrimaryColumn()
    id!: string

    @Column()
    version!: number

    @Column()
    eventName!: string

    @Column({
      nullable: true,
      type: 'jsonb'
    })
    payload!: Record<string, any>

    @Column({ default: true })
    saved?: boolean

    @Column({ default: new Date() })
    createdAt!: Date
  }

  return AggregateEntity
}

function isIndexError(error: Error): error is Error & { code: number; detail: string } {
  return error instanceof QueryFailedError && (error as any).code === '23505'
}

export function isUniqueKeyError(error: Error): boolean {
  return isIndexError(error) && error.detail.includes('uniqueKey')
}
