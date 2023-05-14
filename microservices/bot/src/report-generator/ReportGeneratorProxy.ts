import { injectable } from 'inversify'
import { ReportGeneratorRpcSchema } from '@elikar/rpc-schemas'
import { RpcClient } from '@elikar/rpc-client'
import { ReportGeneratorDto } from '@elikar/dto'

@injectable()
export class ReportGeneratorProxy {
  private readonly proxy: ReportGeneratorRpcSchema
  constructor(rpcClient: RpcClient) {
    this.proxy = rpcClient.getService(ReportGeneratorRpcSchema)
  }

  generateReport(dto: ReportGeneratorDto.GeenrateReport): Promise<string> {
    return this.proxy.generateReport(dto)
  }
}
