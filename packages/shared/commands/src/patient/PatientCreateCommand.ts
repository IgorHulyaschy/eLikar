import { PatientDto } from '@elikar/dto'
import { Command } from '@elikar/message-client'

export class PatientCreateCommand extends Command<PatientDto.CreatePatient> {}
