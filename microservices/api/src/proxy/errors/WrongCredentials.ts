export class WrongCredentials extends Error {
  constructor() {
    super('WRONG_CREDENTIALS')
  }
}
