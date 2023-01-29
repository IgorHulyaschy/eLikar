import { injectable } from 'inversify'

@injectable()
export class UserService {
  ping(): { message: string } {
    return { message: 'pong' }
  }
}
