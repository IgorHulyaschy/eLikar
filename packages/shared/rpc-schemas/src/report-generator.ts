import { ReportGeneratorDto } from '@elikar/dto'

export class PatientRpcSchema {
  queueName = 'report_generator_rpc'
  generateReport!: (dto: ReportGeneratorDto.GeenrateReport) => Promise<Buffer>
}
