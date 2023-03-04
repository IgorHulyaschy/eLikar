import { injectable } from 'inversify'
import { RedisService } from '@elikar/redis'

import { MailerService } from '../mailer'
import { CodeConfirmationError } from './errors'

@injectable()
export class BotService {
  constructor(private readonly mailer: MailerService, private readonly redis: RedisService) {}

  private generateConfirmationCode(): string {
    const resolve = []
    for (let i = 0; i < 6; i++) {
      const char = Math.floor(Math.random() * 9)
      resolve.push(char)
    }
    return resolve.join('')
  }

  async sendConfirmationLetter(email: string, keyOfUser: string): Promise<void> {
    const confirmationCode = this.generateConfirmationCode()
    await this.redis.set(keyOfUser, { confirmationCode, email })

    return this.mailer.sendConfirmationLetter(email, confirmationCode)
  }

  async confirmConnection(code: string, keyOfUser: string): Promise<void> {
    const settedCode = await this.redis.get(keyOfUser)

    if (!settedCode && settedCode !== code) throw new CodeConfirmationError()
    return
  }
}
