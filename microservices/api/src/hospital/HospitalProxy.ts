import { HospitalDto } from '@elikar/dto'
import { RpcClient } from '@elikar/rpc-client'
import { HospitalRpcErrorCodes, RpcError } from '@elikar/rpc-error-codes'
import { HospitalRpcSchema } from '@elikar/rpc-schemas'
import { injectable } from 'inversify'
import { AlreadyExistsError, WrongCredentials } from './errors'

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

  async signIn(data: HospitalDto.SignIn): Promise<{ token: string }> {
    try {
      return await this.proxy.signIn(data)
    } catch (err) {
      if (err instanceof RpcError) {
        if (err.code === HospitalRpcErrorCodes.WRONG_CREDENTIALS) throw new WrongCredentials()
      }
      throw err
    }
  }

  validateToken(token: string): Promise<HospitalDto.Hospital | null> {
    return this.proxy.validateToken(token)
  }
}
