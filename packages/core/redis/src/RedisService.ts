import { inject, injectable } from 'inversify'
import Redis from 'ioredis'
import { TYPES } from './constants'
import { Options } from './interfaces'

@injectable()
export class RedisService {
  private readonly redis: Redis
  constructor(@inject(TYPES.Options) { url }: Options) {
    this.redis = new Redis(url)
  }

  set(key: string, value: string | number): Promise<string | null> {
    return this.redis.set(key, value)
  }

  get(key: string): Promise<string | null> {
    return this.redis.get(key)
  }
}
