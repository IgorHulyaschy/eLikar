import { module } from '@elikar/module'
import { decorate, injectable } from 'inversify'
import Koa from 'koa'

import { DomainApplication } from './DomainApplication'
import { KoaApplication } from './KoaApplication'

@module({
  deps: {
    services(container) {
      decorate(injectable(), Koa)
      container.bind(KoaApplication).toSelf().inSingletonScope()
      container.bind(DomainApplication).toSelf().inSingletonScope()
    }
  }
})
export class ApplicationBuilderModule {}
