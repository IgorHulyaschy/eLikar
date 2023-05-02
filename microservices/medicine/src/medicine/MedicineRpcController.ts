import { rpcController } from '@elikar/application'
import { MedicineDto } from '@elikar/dto'
import { MedicineService } from './MedicineService'

@rpcController('medicine_rpc')
export class MedicineRpcController {
  constructor(private readonly service: MedicineService) {}

  getAll(hospitalId: string): Promise<MedicineDto.Medicine[]> {
    return this.service.list(hospitalId)
  }
}
