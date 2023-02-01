import { Container, interfaces } from 'inversify'

export interface Modules {
  import: () => Container[]
  local: () => Container[]
  rpc?: () => Container[]
}

export abstract class ApplicationModule {
  mainContainer!: interfaces.Container

  init(): void {
    const { import: imported, local, rpc } = this.modules()
    const [dep1, ...otherDeps1] = local()
    const [dep2, ...otherDeps2] = imported()
    this.mainContainer = Container.merge(dep1, dep2, ...otherDeps1, ...otherDeps2)
    if (rpc) {
      const [rpcModule] = rpc()
      this.mainContainer = Container.merge(this.mainContainer, rpcModule)
    }
  }

  get<T>(servicesIdentifier: interfaces.ServiceIdentifier<T>): T {
    return this.mainContainer.get(servicesIdentifier)
  }

  abstract modules(): Modules
}
