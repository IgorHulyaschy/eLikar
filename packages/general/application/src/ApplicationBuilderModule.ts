import { IModule, Module } from '@elikar/module'
import { decorate, injectable } from 'inversify'
import Koa from 'koa'

import { DomainApplication } from './DomainApplication'
import { KoaApplication } from './KoaApplication'

export class ApplicationBuilderModule extends Module {
  register(): IModule {
    return {
      deps: {
        services(container) {
          decorate(injectable(), Koa)
          container.bind(KoaApplication).toSelf().inSingletonScope()
          container.bind(DomainApplication).toSelf().inSingletonScope()
        }
      }
    }
  }
}
