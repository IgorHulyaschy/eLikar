import { NurseDto } from '@elikar/dto'

export class NurseRpcSchema {
  queueName = 'nurse_rpc'
  validateCreation!: (dto: NurseDto.CreateNurse) => Promise<void>
  getByTgId!: (id: string) => Promise<NurseDto.Nurse>
  signIn!: (dto: NurseDto.SignIn) => Promise<{ token: string }>
  validateToken!: (token: string) => Promise<NurseDto.Nurse | null>
  get!: (id: string) => Promise<NurseDto.Nurse>
}
