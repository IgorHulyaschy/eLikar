import { HospitalDto } from '@elikar/dto'
import { RpcError, HospitalRpcErrorCodes } from '@elikar/rpc-error-codes'
import { rpcController } from '@elikar/application'

import { AlreadyExistsError, WrongCredentialsError } from './errors'
import { HospitalService } from './HospitalService'

@rpcController('hospital_rpc_queue')
export class HospitalRpcController {
  constructor(private readonly service: HospitalService) {}

  async validateCreation(data: HospitalDto.CreateHospital): Promise<void> {
    try {
      await this.service.validateCreation(data)
    } catch (err) {
      if (err instanceof AlreadyExistsError)
        throw new RpcError(HospitalRpcErrorCodes.ALREADY_EXISTS)
      throw err
    }
  }

  async signIn(data: HospitalDto.SignIn): Promise<{ token: string }> {
    try {
      return await this.service.signIn(data)
    } catch (err) {
      if (err instanceof WrongCredentialsError)
        throw new RpcError(HospitalRpcErrorCodes.WRONG_CREDENTIALS)
      throw err
    }
  }

  validateToken(token: string): Promise<HospitalDto.Hospital | null> {
    return this.service.validateToken(token)
  }

  get(id: string): Promise<HospitalDto.Hospital> {
    return this.service.get(id)
  }
}
