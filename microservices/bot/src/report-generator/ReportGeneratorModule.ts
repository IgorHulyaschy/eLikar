import { module } from '@elikar/module'
import { ReportGeneratorProxy } from './ReportGeneratorProxy'

@module({
  deps: {
    services(container) {
      container.bind(ReportGeneratorProxy).toSelf().inSingletonScope()
    }
  }
})
export class ReportGeneratorModule {}
