export class RpcError extends Error {
  constructor(readonly code?: number) {
    super()
  }
}
