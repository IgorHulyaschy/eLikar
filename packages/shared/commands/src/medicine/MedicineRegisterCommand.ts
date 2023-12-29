import { MedicineDto } from '@elikar/dto'
import { Command } from '@elikar/message-client'

export class MedicineRegisterCommand extends Command<MedicineDto.MedicineRegister> {}
