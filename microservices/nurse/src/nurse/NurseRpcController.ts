import { rpcController } from '@elikar/application'
import { ElectronicQueueDto, NurseDto } from '@elikar/dto'
import { TokenExpiredError } from '@elikar/jwt'
import { RpcError, NurseRpcErrorCodes } from '@elikar/rpc-error-codes'
import { ElectronicQueueService } from '../electronic-queue/ElectronicQueueService'

import { AlreadyExistsError, WrongCredentialsError } from './errors'
import { NurseService } from './NurseService'

@rpcController('nurse_rpc')
export class NurseRpcController {
  constructor(
    private readonly service: NurseService,
    private readonly queueService: ElectronicQueueService
  ) {}

  async validateCreation(dto: NurseDto.CreateNurse): Promise<void> {
    try {
      return await this.service.validateCreation(dto)
    } catch (err) {
      if (err instanceof AlreadyExistsError) throw new RpcError(NurseRpcErrorCodes.ALREADY_EXISTS)
      throw err
    }
  }

  getByTgId(id: string): Promise<NurseDto.Nurse> {
    return this.service.getByTgId(id)
  }

  async signIn(dto: NurseDto.SignIn): Promise<{ token: string }> {
    try {
      return await this.service.signIn(dto)
    } catch (err) {
      if (err instanceof WrongCredentialsError)
        throw new RpcError(NurseRpcErrorCodes.WRONG_CREDENTIALS)
      throw err
    }
  }

  async validateToken(token: string): Promise<NurseDto.Nurse | null> {
    try {
      return await this.service.validateToken(token)
    } catch (err) {
      if (err instanceof TokenExpiredError) throw new RpcError(NurseRpcErrorCodes.TOKEN_EXPIRED)
      throw err
    }
  }

  get(id: string): Promise<NurseDto.Nurse> {
    return this.service.get(id)
  }

  getElectronicQueue(dto: ElectronicQueueDto.GetElectronicQueue): Promise<
    Record<
      string,
      Record<
        string,
        {
          id: string
          hospitalId: string
          nurseId: string
          patientId: string
          status: ElectronicQueueDto.Status
          dayOfMonth: Date
          bookedTime: string
        }
      >
    >
  > {
    return this.queueService.getFreeSlots(dto)
  }

  startOverview({ id }: { id: string }): Promise<void> {
    return this.queueService.startOverview(id)
  }
}
