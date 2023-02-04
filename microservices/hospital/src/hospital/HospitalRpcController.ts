import { HospitalDto } from '@elikar/dto'
import { HospitalRpcSchema } from '@elikar/rpc-schemas'
import { RpcError, HospitalRpcErrorCodes } from '@elikar/rpc-error-codes'
import { injectable } from 'inversify'

import { AlreadyExistsError } from './errors'
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
}
