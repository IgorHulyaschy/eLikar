import { rpcController } from '@elikar/application'
import { ReportGeneratorDto } from '@elikar/dto'
import { ReportGeneratorService } from './ReportGeneratorService'

@rpcController('report_generator_rpc')
export class ReportGeneratorRpcController {
  constructor(private readonly service: ReportGeneratorService) {}
  generateReport(dto: ReportGeneratorDto.GeenrateReport): Promise<string> {
    return this.service.generateReport(dto)
  }
}
