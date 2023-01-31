import { Container, interfaces } from 'inversify'

export interface Modules {
  import: Container[]
  local: Container[]
}

export abstract class ApplicationModule {
  mainContainer!: interfaces.Container

  init(): void {
    const {
      import: [dep, ...otherImportedModules],
      local: [local, ...otherLocalModules]
    } = this.modules()

    this.mainContainer = Container.merge(local, dep, ...otherLocalModules, ...otherImportedModules)
  }

  get<T>(servicesIdentifier: interfaces.ServiceIdentifier<T>): T {
    return this.mainContainer.get(servicesIdentifier)
  }

  abstract modules(): Modules
}
