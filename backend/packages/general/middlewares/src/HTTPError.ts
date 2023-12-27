export class HTTPError extends Error {
  readonly status: number
  readonly message: string
  constructor({ status, message }: { status: number; message: string }) {
    super(message)
    this.status = status
    this.message = message
  }
}
