import { Command } from '@elikar/message-client'

export class NurseTelegramConnectCommand extends Command<{ id: string; email: string }> {}
