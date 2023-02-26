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
function body(pipe: any): ParameterDecorator {
  return function (target, prKey, parameterIndex) {
    console.log(pipe, target, prKey, parameterIndex)
  }
}

const pipe = {}
class A {
  foo(@body(pipe) ctx: any): any {
    console.log('foo')
  }
}

const a = new A()

a.foo({ message: 'yaeh' })
