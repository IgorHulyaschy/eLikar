import { inject, injectable } from 'inversify'
import Redis from 'ioredis'
import { TYPES } from './constants'
import { Options } from './interfaces'

@injectable()
export class RedisService {
  private readonly redis: Redis
  constructor(@inject(TYPES.Options) { url }: Options) {
    this.redis = new Redis(6379)
  }

  set(key: string, value: string | number | object): Promise<string | null> {
    if (typeof value === 'object') value = JSON.stringify(value)
    return this.redis.set(key, value)
  }

  async get(key: string): Promise<Record<string, any> | null> {
    const value = await this.redis.get(key)

    if (!value) return null
    return JSON.parse(value)
  }
}
