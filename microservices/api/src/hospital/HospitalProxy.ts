import { HospitalDto } from '@elikar/dto'
import { RpcClient } from '@elikar/rpc-client'
import { HospitalRpcErrorCodes, RpcError } from '@elikar/rpc-error-codes'
import { HospitalRpcSchema } from '@elikar/rpc-schemas'
import { injectable } from 'inversify'
import { AlreadyExistsError } from './errors'

@injectable()
export class HospitalProxy {
  private readonly proxy: HospitalRpcSchema
  constructor(rpcClient: RpcClient) {
    this.proxy = rpcClient.getService(HospitalRpcSchema)
  }

  async validateCreation(data: HospitalDto.CreateHospital): Promise<void> {
    try {
      await this.proxy.validateCreation(data)
    } catch (err) {
      if (err instanceof RpcError) {
        if (err.code === HospitalRpcErrorCodes.ALREADY_EXISTS) throw new AlreadyExistsError()
      }
      throw err
    }
  }
}
