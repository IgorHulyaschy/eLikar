import { Container, interfaces } from 'inversify'
import { Class } from 'type-fest'
import { getModuleMetadata } from './decorators'
import { IModule } from './interfaces'

export class ApplicationModule {
  mainContainer = new Container()
  globalWebControllers: Array<Class<any>> = []
  globalRpcControllers: Array<Class<any>> = []
  globalMessageControllers: Array<Class<any>> = []
  globalBotControllers: Array<Class<any>> = []
  constructor(private readonly appModule: IModule) {}

  private defineControllers(ctor: IModule): void {
    if (ctor.deps) {
      if (ctor.deps.messageControllers) {
        ctor.deps.messageControllers.forEach((controller) => {
          this.mainContainer.bind(controller).toSelf().inSingletonScope()
          this.globalMessageControllers.push(controller)
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
      if (ctor.deps.botControllers) {
        ctor.deps.botControllers.forEach((controller) => {
          this.mainContainer.bind(controller).toSelf().inSingletonScope()
          this.globalBotControllers.push(controller)
        })
      }
      ctor.deps.services(this.mainContainer)
    }
  }

  init(): void {
    const { imports, deps } = this.appModule
    if (imports) {
      imports.forEach((module) => {
        const moduleMetadata = getModuleMetadata(module)
        if (!moduleMetadata && 'deps' in module) return this.defineControllers(module)

        return this.defineControllers(moduleMetadata)
      })
    }

    if (deps) {
      deps.services(this.mainContainer)
    }
  }

  getMessageControllers(): Array<Class<any>> {
    return this.globalMessageControllers
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

  getContainer(): Container {
    return this.mainContainer
  }
}
