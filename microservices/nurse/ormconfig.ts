import { ConnectionOptions } from 'typeorm'

import { Nurse } from './src/nurse/Nurse'

const config: ConnectionOptions = {
  url: process.env.POSTGRES_URL ?? 'postgres://localhost/postgres',
  type: 'postgres',
  migrations: ['migrations/*.ts'],
  entities: [Nurse],
  cli: {
    migrationsDir: 'migrations'
  }
}

export default config
