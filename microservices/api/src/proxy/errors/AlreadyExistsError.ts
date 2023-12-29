export class AlreadyExistsError extends Error {
  constructor() {
    super('ALREADY_EXISTS')
  }
}
