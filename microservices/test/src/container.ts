import { Container, injectable, decorate } from 'inversify'
import { App } from './App'
import { Builder } from './Builder'
import { Controller } from './Controller'
import Koa from 'koa'
import { Service } from './Service'
import { Middleware } from './Middleware'

const container = new Container()
decorate(injectable(), Koa)
container.bind(App).toSelf().inSingletonScope()
container.bind(Controller).toSelf().inSingletonScope()
container.bind(Builder).toSelf().inSingletonScope()
container.bind(Service).toSelf().inSingletonScope()
container.bind(Middleware).toSelf().inSingletonScope()

export { container }
