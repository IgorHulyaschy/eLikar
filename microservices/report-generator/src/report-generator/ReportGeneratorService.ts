import { inject, injectable } from 'inversify'
import { ReportGeneratorDto } from '@elikar/dto'
import { TYPES } from './constants'
import { IFileGenerator } from './IFileGenerator'

@injectable()
export class ReportGeneratorService {
  constructor(@inject(TYPES.ReportGenerator) private readonly generator: IFileGenerator) {}

  async generateReport(dto: ReportGeneratorDto.GeenrateReport): Promise<string> {
    return this.generator.generate(dto)
  }
}
