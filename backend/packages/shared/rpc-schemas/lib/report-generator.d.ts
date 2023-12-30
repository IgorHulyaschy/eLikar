import { ReportGeneratorDto } from '@elikar/dto';
export declare class ReportGeneratorRpcSchema {
    queueName: string;
    generateReport: (dto: ReportGeneratorDto.GeenrateReport) => Promise<string>;
}
//# sourceMappingURL=report-generator.d.ts.map