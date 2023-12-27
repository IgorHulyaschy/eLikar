import { ConnectionOptions } from 'typeorm'

import { Hospital } from './src/hospital/Hospital'

const config: ConnectionOptions = {
  url: process.env.POSTGRES_URL ?? 'postgres://postgres:postgres@localhost:5432/postgres',
  type: 'postgres',
  migrations: ['migrations/*.ts'],
  entities: [Hospital],
  cli: {
    migrationsDir: 'migrations'
  }
}

export default config
