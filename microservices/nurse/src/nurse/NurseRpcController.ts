import { rpcController } from '@elikar/application'
import { NurseDto } from '@elikar/dto'
import { RpcError, NurseRpcErrorCodes } from '@elikar/rpc-error-codes'

import { AlreadyExistsError } from './errors'
import { NurseService } from './NurseService'

@rpcController('nurse_rpc')
export class NurseRpcController {
  constructor(private readonly service: NurseService) {}

  async validateCreation(dto: NurseDto.CreateNurse): Promise<void> {
    try {
      return await this.service.validateCreation(dto)
    } catch (err) {
      if (err instanceof AlreadyExistsError) throw new RpcError(NurseRpcErrorCodes.ALREADY_EXISTS)
      throw err
    }
  }
}
