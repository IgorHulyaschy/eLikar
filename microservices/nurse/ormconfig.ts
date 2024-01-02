import { ConnectionOptions } from 'typeorm'

import { Nurse } from './src/nurse/Nurse'
import { ElectronicQueue } from './src/electronic-queue/ElectronicQueue'

const config: ConnectionOptions = {
  url: process.env.POSTGRES_URL ?? 'postgres://postgres:postgres@localhost:5432/postgres',
  type: 'postgres',
  migrations: ['migrations/*.ts'],
  entities: [Nurse, ElectronicQueue],
  cli: {
    migrationsDir: 'migrations'
  },
  logging: true
}

export default config
