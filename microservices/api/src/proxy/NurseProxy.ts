import { NurseDto } from '@elikar/dto'
import { RpcClient } from '@elikar/rpc-client'
import { NurseRpcErrorCodes, RpcError } from '@elikar/rpc-error-codes'
import { NurseRpcSchema } from '@elikar/rpc-schemas'
import { injectable } from 'inversify'
import { AlreadyExistsError } from './errors'

@injectable()
export class NurseProxy {
  private readonly proxy: NurseRpcSchema
  constructor(rpcClient: RpcClient) {
    this.proxy = rpcClient.getService(NurseRpcSchema)
  }

  async validateCreation(dto: NurseDto.CreateNurse): Promise<void> {
    try {
      return await this.proxy.validateCreation(dto)
    } catch (err) {
      if (err instanceof RpcError) {
        if (err.code === NurseRpcErrorCodes.ALREADY_EXISTS) throw new AlreadyExistsError()
      }
      throw err
    }
  }
}
