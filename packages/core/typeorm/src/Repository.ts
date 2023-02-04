import { Logger } from '@elikar/logger'
import { injectable } from 'inversify'
import { Class } from 'type-fest'
import { getManager } from 'typeorm'

export interface IRepository<Entity> {
  save: (entity: Entity) => Promise<Entity>

  findOne: (param: Partial<Entity>) => Promise<Entity | undefined>
}

export function Repository<Entity>(entity: Class<Entity>): Class<IRepository<Entity>> {
  @injectable()
  class Repos implements IRepository<Entity> {
    constructor(private readonly logger: Logger) {}
    async findOne(param: Partial<Entity>, em = getManager()): Promise<Entity | undefined> {
      const res = await em.findOne(entity, { where: param })
      return res
    }

    async save(entity: Entity, em = getManager()): Promise<Entity> {
      return em.save(entity).catch((err) => {
        if (err.detail.includes('already exists')) {
          this.logger.error(`Not unique error`)
        }
        throw err
      })
    }
  }
  return Repos
}
