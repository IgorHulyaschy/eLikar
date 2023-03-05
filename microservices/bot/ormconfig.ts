import { ConnectionOptions } from 'typeorm'

import { Bot } from './src/bot/Bot'

const config: ConnectionOptions = {
  url: process.env.POSTGRES_URL ?? 'postgres://localhost/postgres',
  type: 'postgres',
  migrations: ['migrations/*.ts'],
  entities: [Bot],
  cli: {
    migrationsDir: 'migrations'
  }
}

export default config
