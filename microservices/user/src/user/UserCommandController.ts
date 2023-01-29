import { Logger } from '@elikar/logger'
import { injectable } from 'inversify'
import { UserService } from './UserService'

@injectable()
export class UserCommandController {
  constructor(private readonly logger: Logger, private readonly service: UserService) {}

  createUser = async (data: any): Promise<void> => {
    this.service.createUser(data)
    this.logger.info(data)
  }
}
