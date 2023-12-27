import { ConnectionOptions } from 'typeorm'

import { Patient } from './src/patient/Patient'

const config: ConnectionOptions = {
  url: process.env.POSTGRES_URL ?? 'postgres://postgres:postgres@localhost:5432/postgres',
  type: 'postgres',
  migrations: ['migrations/*.ts'],
  entities: [Patient],
  cli: {
    migrationsDir: 'migrations'
  }
}

export default config
