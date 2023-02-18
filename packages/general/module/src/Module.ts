import { IModule } from './interfaces'

export abstract class Module {
  init(): IModule {
    return this.register()
  }

  abstract register(): IModule
}
