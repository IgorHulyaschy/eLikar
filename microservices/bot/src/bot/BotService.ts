import { injectable } from 'inversify'

@injectable()
export class BotService {
  sendHello(): any {
    return 'Hello'
  }

  sayHello(): any {
    return 'Welcome'
  }
}
