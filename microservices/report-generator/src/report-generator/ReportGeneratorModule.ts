import { module } from '@elikar/module'
import { IconvService } from '../iconv'
import { TYPES } from './constants'
import { IFileGenerator } from './IFileGenerator'
import { ReportGeneratorRpcController } from './ReportGeneratorRpcController'
import { ReportGeneratorService } from './ReportGeneratorService'

@module({
  deps: {
    services(container) {
      container.bind(ReportGeneratorService).toSelf().inSingletonScope()
      container.bind<IFileGenerator>(TYPES.ReportGenerator).to(IconvService).inSingletonScope()
    },
    rpcControllers: [ReportGeneratorRpcController]
  }
})
export class ReportGeneratorModule {}
