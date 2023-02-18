import { Container, injectable } from 'inversify'
import Koa from 'koa'
// import { Controller } from './Controller'
import Router from 'koa-router'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import { Builder } from './Builder'

@injectable()
export class App extends Koa {
  constructor(private readonly builder: Builder) {
    super()
  }

  private initControllers(container: Container): void {
    const router = new Router()
    router.use('/api', this.builder.initRouters(container).middleware())

    this.use(router.middleware())
  }

  init(container: Container): any {
    this.use(cors())
    this.use(koaBody())

    this.initControllers(container)
    this.listen(3000, () => console.log('server running 3000'))
  }
}
