import { NurseDto } from '@elikar/dto'

export class NurseRpcSchema {
  queueName = 'nurse_rpc'
  validateCreation!: (dto: NurseDto.CreateNurse) => Promise<void>
}
