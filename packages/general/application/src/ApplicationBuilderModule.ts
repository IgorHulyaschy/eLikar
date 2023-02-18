import { DynamicModule, IModule } from '@elikar/module'
import { decorate, injectable } from 'inversify'
import Koa from 'koa'
import { ApplicationBuilder } from './ApplicationBuilder'
import { TYPES } from './constants'
import { KoaApplication } from './KoaApplication'

export class ApplicationBuilderModule extends DynamicModule<{ port: number }> {
  register(options: { port: number }): IModule {
    return {
      deps: {
        services(container) {
          decorate(injectable(), Koa)
          container.bind<{ port: number }>(TYPES.Options).toConstantValue(options)
          container.bind(ApplicationBuilder).toSelf().inSingletonScope()
          container.bind(KoaApplication).toSelf().inSingletonScope()
        }
      }
    }
  }
}
