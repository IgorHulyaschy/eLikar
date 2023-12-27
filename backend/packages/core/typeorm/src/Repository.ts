/* eslint-disable new-cap */
import { Logger } from '@elikar/logger'
import { injectable } from 'inversify'
import { Class } from 'type-fest'
import { getManager } from 'typeorm'
import { Domain } from './Domain'

type Ctor<Entity> = Domain<Entity> & Record<string, any> & { id: string }

export interface IRepository<Entity extends Ctor<Entity>> {
  save: (entity: Entity) => Promise<Entity>

  findOne: (param: Partial<Entity>) => Promise<Entity | undefined>

  update: (data: Entity) => Promise<void>
}

export function Repository<Entity extends Ctor<Entity>>(
  entity: Class<Entity>
): Class<IRepository<Entity>> {
  @injectable()
  class Repos implements IRepository<Entity> {
    constructor(private readonly logger: Logger) {}
    async findOne(param: Partial<Entity>, em = getManager()): Promise<Entity | undefined> {
      const en = await em.findOne(entity, { where: param })
      if (!en) return undefined

      const domain = new entity()
      domain.getEntity(en)
      return domain
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
