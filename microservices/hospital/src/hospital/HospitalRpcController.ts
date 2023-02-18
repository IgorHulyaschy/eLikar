import { HospitalDto } from '@elikar/dto'
import { HospitalRpcSchema } from '@elikar/rpc-schemas'
import { RpcError, HospitalRpcErrorCodes } from '@elikar/rpc-error-codes'
import { injectable } from 'inversify'

import { AlreadyExistsError, WrongCredentials } from './errors'
import { HospitalService } from './HospitalService'

@injectable()
export class HospitalRpcController implements HospitalRpcSchema {
  queueName = 'hospital_rpc_queue'
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
      if (err instanceof WrongCredentials)
        throw new RpcError(HospitalRpcErrorCodes.WRONG_CREDENTIALS)
      throw err
    }
  }

  validateToken(token: string): Promise<HospitalDto.Hospital | null> {
    return this.service.validateToken(token)
  }
}
