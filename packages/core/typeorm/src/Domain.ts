export abstract class Domain<Entity> {
  abstract getEntity(entity: Entity): void
}
