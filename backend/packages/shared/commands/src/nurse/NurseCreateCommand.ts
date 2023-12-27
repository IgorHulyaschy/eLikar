import { NurseDto } from '@elikar/dto'
import { Command } from '@elikar/message-client'

export class NurseCreateCommand extends Command<NurseDto.CreateNurse> {}
