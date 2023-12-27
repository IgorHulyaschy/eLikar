import { MedicineDto } from '@elikar/dto'
import { Command } from '@elikar/message-client'

export class MedicineCountUpdateCommand extends Command<MedicineDto.MedicineUpdateCount> {}
