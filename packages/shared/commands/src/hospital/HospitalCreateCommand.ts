import { Command } from '@elikar/message-client'
import { HospitalDto } from '@elikar/dto'

export class HospitalCreateCommand extends Command<HospitalDto.CreateHospital> {}
