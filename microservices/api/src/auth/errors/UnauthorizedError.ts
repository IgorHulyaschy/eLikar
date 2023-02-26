export class UnauthorizedError extends Error {
  readonly UNAUTHORIZED = true
  constructor() {
    super('UNAUTHORIZED')
  }
}
