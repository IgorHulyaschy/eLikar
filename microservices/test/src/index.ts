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

function rpcSchema(queue: string): ClassDecorator {
  return function (con: any): any {
    return class extends con {
      queue = queue
    }
  }
}

// class RpcQueue {
//   queue!: string
// }

@rpcSchema('rpc_queue')
class A {}

const a = new A()
console.log(a.queue)
