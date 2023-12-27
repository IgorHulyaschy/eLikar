import { MedicineDto } from '@elikar/dto'

export class MedicineRpcSchema {
  queueName = 'medicine_rpc'
  getAll!: (hospitalId: string) => Promise<MedicineDto.Medicine[]>
  get!: (id: string) => Promise<MedicineDto.Medicine>
}
