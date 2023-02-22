/* eslint-disable @typescript-eslint/no-extraneous-class */
// import { Container } from 'inversify'
// import { App } from './App'
// import { AppModule } from './container'

// import { App } from './App'
// import { container } from './container'

// function main(): any {
//   const app = container.get(App)

//   app.init(container)
// }
// main()
import { Container, inject, injectable } from 'inversify'
import { getModuleMetadata, module } from './decorators'

const TYPES = {
  opt: Symbol('asd')
}

@injectable()
export class B {
  baz(): any {
    console.log('baz')
  }
}

@injectable()
export class A {
  constructor(private readonly b: B, @inject(TYPES.opt) private readonly opt: any) {}
  foo(): any {
    console.log(this.opt)
    return this.b.baz()
  }
}

@module({
  deps: {
    services(local) {
      local.bind(A).toSelf().inSingletonScope()
      local.bind(B).toSelf().inSingletonScope()
      local.bind(TYPES.opt).toConstantValue('message')
    }
  }
})
export class Module {
  static register(options: any): {
    deps: { services: (container: Container) => void }
    module: any
  } {
    return {
      deps: {
        services(local) {
          local.bind(A).toSelf().inSingletonScope()
          local.bind(B).toSelf().inSingletonScope()
          local.bind(TYPES.opt).toConstantValue(options)
        }
      },
      module: this
    }
  }
}

class GlobalModule {
  init(): any {
    return [Module.register('message')]
  }
}

class Builder {
  container = new Container()
  constructor(private readonly blog: GlobalModule) {}

  build(): any {
    const metadata = getModuleMetadata(this.blog.init()[0])
    if (!metadata) {
      this.blog.init()[0].deps.services(this.container)
    }
    // metadata.deps?.services(this.container)
  }

  start(): any {
    this.container.get(A).foo()
  }
}
const app = new Builder(new GlobalModule())
app.build()
app.start()
