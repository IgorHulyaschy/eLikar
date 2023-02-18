import { Container, interfaces } from 'inversify'
import { Class } from 'type-fest'
import { IModule } from './interfaces'

export interface Modules {
  import: () => IModule[]
  local: () => IModule[]
  rpc?: () => IModule[]
}

export abstract class ApplicationModule {
  mainContainer = new Container()
  globalWebControllers: Array<Class<any>> = []
  globalRpcControllers: Array<Class<any>> = []
  globalCqrsControllers: Array<Class<any>> = []

  private defineControllers(ctors: IModule[]): void {
    for (const ctor of ctors) {
      if (ctor.deps.cqrsControllers) {
        ctor.deps.cqrsControllers.forEach((controller) => {
          this.mainContainer.bind(controller).toSelf().inSingletonScope()
          this.globalCqrsControllers.push(controller)
        })
      }
      if (ctor.deps.rpcControllers) {
        ctor.deps.rpcControllers.forEach((controller) => {
          this.mainContainer.bind(controller).toSelf().inSingletonScope()
          this.globalRpcControllers.push(controller)
        })
      }
      if (ctor.deps.webControllers) {
        ctor.deps.webControllers.forEach((controller) => {
          this.mainContainer.bind(controller).toSelf().inSingletonScope()
          this.globalWebControllers.push(controller)
        })
      }
      ctor.deps.services(this.mainContainer)
    }
  }

  init(): void {
    const { import: imported, local, rpc } = this.register()
    const localCtors = local()
    const importedCtors = imported()
    for (const ctors of [importedCtors, localCtors]) {
      this.defineControllers(ctors)
    }
    if (rpc) {
      const [rpcModule] = rpc()
      rpcModule.deps.services(this.mainContainer)
    }
  }

  getCqrsControllers(): Array<Class<any>> {
    return this.globalCqrsControllers
  }

  getRpcControllers(): Array<Class<any>> {
    return this.globalRpcControllers
  }

  getWebControllers(): Array<Class<any>> {
    return this.globalWebControllers
  }

  get<T>(servicesIdentifier: interfaces.ServiceIdentifier<T>): T {
    return this.mainContainer.get(servicesIdentifier)
  }

  abstract register(): Modules
}
