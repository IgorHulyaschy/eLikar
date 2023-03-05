/* eslint-disable new-cap */
import { Logger } from '@elikar/logger'
import { injectable } from 'inversify'
import { Class } from 'type-fest'
import { getManager } from 'typeorm'

type Ctor = { id: string } & Record<string, any>
export interface IRepository<Entity extends Ctor> {
  save: (entity: Entity) => Promise<Entity>

  findOne: (param: Partial<Entity>) => Promise<Entity | undefined>

  update: (data: Entity) => Promise<void>
}

export function Repository<Entity extends Ctor>(entity: Class<Entity>): Class<IRepository<Entity>> {
  @injectable()
  class Repos implements IRepository<Entity> {
    constructor(private readonly logger: Logger) {}
    async findOne(param: Partial<Entity>, em = getManager()): Promise<Entity | undefined> {
      const res = await em.findOne(entity, { where: param })
      return new entity(res)
    }

    async save(entity: Entity, em = getManager()): Promise<Entity> {
      return em.save(entity).catch((err) => {
        if (err.detail.includes('already exists')) {
          this.logger.error(`Not unique error`)
        }
        throw err
      })
    }

    async update({ id, ...toUpdate }: Entity, em = getManager()): Promise<void> {
      await em.update(entity, { id }, toUpdate as any)
    }
  }
  return Repos
}
