import { Logger } from '@elikar/logger'
import { injectable } from 'inversify'

@injectable()
export class UserService {
  constructor(private readonly logger: Logger) {}
  createUser({ message }: { message: string }): string {
    this.logger.info(message)
    return 'OK'
  }
}
