import { IModule } from './interfaces'

export abstract class DynamicModule<T> {
  init(options: T): IModule {
    return this.register(options)
  }

  abstract register(options: T): IModule
}
