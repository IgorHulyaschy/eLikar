import { NurseDto } from '@elikar/dto'
import { RpcClient } from '@elikar/rpc-client'
import { NurseRpcErrorCodes, RpcError } from '@elikar/rpc-error-codes'
import { NurseRpcSchema } from '@elikar/rpc-schemas'
import { injectable } from 'inversify'
import { AlreadyExistsError, TokenExpitedError, WrongCredentials } from './errors'

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

  async signIn(data: NurseDto.SignIn): Promise<{ token: string }> {
    try {
      return await this.proxy.signIn(data)
    } catch (err) {
      if (err instanceof RpcError) {
        if (err.code === NurseRpcErrorCodes.WRONG_CREDENTIALS) throw new WrongCredentials()
      }
      throw err
    }
  }

  async validateToken(token: string): Promise<NurseDto.Nurse | null> {
    try {
      return await this.proxy.validateToken(token)
    } catch (err) {
      if (err instanceof RpcError) {
        if (err.code === NurseRpcErrorCodes.TOKEN_EXPIRED) throw new TokenExpitedError()
      }
      throw err
    }
  }
}
