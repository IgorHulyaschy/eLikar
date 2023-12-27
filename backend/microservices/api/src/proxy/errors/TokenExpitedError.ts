export class TokenExpitedError extends Error {
  readonly TOKEN_EXPIRED = true
  constructor() {
    super('TOKEN_EXPIRED')
  }
}
