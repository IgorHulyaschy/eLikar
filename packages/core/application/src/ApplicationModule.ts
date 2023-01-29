import { Container, interfaces } from 'inversify'

export abstract class ApplicationModule {
  mainContainer!: interfaces.Container

  init(): void {
    const [dep, ...otherImportedModules] = this.importedModules()
    const [local, ...otherLocalModules] = this.localModules()

    this.mainContainer = Container.merge(local, dep, ...otherLocalModules, ...otherImportedModules)
  }

  get<T>(servicesIdentifier: interfaces.ServiceIdentifier<T>): T {
    return this.mainContainer.get(servicesIdentifier)
  }

  abstract localModules(): Container[]
  abstract importedModules(): Container[]
}
