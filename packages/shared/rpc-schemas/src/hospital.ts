import { HospitalDto } from '@elikar/dto'

export class HospitalRpcSchema {
  queueName = 'hospital_rpc_queue'
  validateCreation!: (data: HospitalDto.CreateHospital) => Promise<void>
  signIn!: (data: HospitalDto.SignIn) => Promise<{ token: string }>
  validateToken!: (token: string) => Promise<HospitalDto.Hospital | null>
}
