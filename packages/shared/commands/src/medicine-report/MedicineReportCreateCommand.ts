import { MedicineReportDto } from '@elikar/dto'
import { Command } from '@elikar/message-client'

export class MedicineReportCreateCommand extends Command<MedicineReportDto.CreateMedicineReport> {}
