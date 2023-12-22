import { ConnectionOptions } from 'typeorm'

import { MedicineEntity } from './src/medicine/MedicineRepository'

const config: ConnectionOptions = {
  url: process.env.POSTGRES_URL ?? 'postgres://postgres:postgres@localhost:5432/postgres',
  type: 'postgres',
  migrations: ['migrations/*.ts'],
  entities: [MedicineEntity] as any[],
  cli: {
    migrationsDir: 'migrations'
  }
}

export default config
