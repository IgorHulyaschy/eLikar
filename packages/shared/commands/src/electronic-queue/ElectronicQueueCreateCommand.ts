import { ElectronicQueueDto } from '@elikar/dto'
import { Command } from '@elikar/message-client'

export class ElectronicQueueCreateCommand extends Command<ElectronicQueueDto.CreateElectronicQueue> {}
