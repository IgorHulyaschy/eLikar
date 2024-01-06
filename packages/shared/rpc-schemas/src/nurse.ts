import { ElectronicQueueDto, NurseDto } from '@elikar/dto'

export class NurseRpcSchema {
  queueName = 'nurse_rpc'
  validateCreation!: (dto: NurseDto.CreateNurse) => Promise<void>
  getByTgId!: (id: string) => Promise<NurseDto.Nurse>
  signIn!: (dto: NurseDto.SignIn) => Promise<{ token: string }>
  validateToken!: (token: string) => Promise<NurseDto.Nurse | null>
  get!: (id: string) => Promise<NurseDto.Nurse>
  getElectronicQueue!: (dto: ElectronicQueueDto.GetElectronicQueue) => Promise<
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
  >

  startOverview!: (dto: ElectronicQueueDto.SetDone) => Promise<void>
  getList!: () => Promise<NurseDto.Nurse[]>
  delete!: (queueId: string) => Promise<void>
}
