import { Class } from 'type-fest'
import 'reflect-metadata'
import { Column, Entity, Index, PrimaryColumn, QueryFailedError } from 'typeorm'
import { Event } from './Event'

export function createAggregateEntity(tableName: string): Class<Event<any>> {
  @Entity({ name: tableName })
  @Index(['aggregateId', 'aggregateVersion'], { unique: true })
  class AggregateEntity implements Event<any> {
    @PrimaryColumn()
    id!: string

    @Column()
    aggregateId!: string

    @Column()
    aggregateVersion!: number

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
