export class UnauthorizedError extends Error {
  constructor() {
    super('UNAUTHORIZED')
  }
}
