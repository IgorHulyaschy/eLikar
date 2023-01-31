import { Container, interfaces } from 'inversify'

export abstract class Module {
  container = new Container()
  init(): Container {
    this.register()
    return this.container
  }

  bind<K>(ctor: interfaces.ServiceIdentifier<K>): interfaces.BindingToSyntax<K> {
    return this.container.bind<K>(ctor)
  }

  abstract register(): void
}
