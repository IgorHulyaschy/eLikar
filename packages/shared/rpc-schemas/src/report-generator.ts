import { ReportGeneratorDto } from '@elikar/dto'

export class ReportGeneratorRpcSchema {
  queueName = 'report_generator_rpc'
  generateReport!: (dto: ReportGeneratorDto.GeenrateReport) => Promise<string>
}
