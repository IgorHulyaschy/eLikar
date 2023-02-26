import { Command } from '@elikar/message-client'

export class HospitalSendRegistrationLettersCommand extends Command<{
  emails: string[]
  hospitalId: string
}> {}
