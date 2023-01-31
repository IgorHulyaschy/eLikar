import { Container, interfaces } from 'inversify'

export abstract class DynamicModule<T> {
  container = new Container()
  init(options: T): Container {
    this.register(options)
    return this.container
  }

  bind<K>(ctor: interfaces.ServiceIdentifier<K>): interfaces.BindingToSyntax<K> {
    return this.container.bind<K>(ctor)
  }

  abstract register(options: T): void
}
