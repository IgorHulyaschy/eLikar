import { ConnectionOptions } from 'typeorm'

import { MedicineReport } from './src/medicine-report/MedicineReport'

const config: ConnectionOptions = {
  url: process.env.POSTGRES_URL ?? 'postgres://postgres:postgres@localhost:5432/postgres',
  type: 'postgres',
  migrations: ['migrations/*.ts'],
  entities: [MedicineReport],
  cli: {
    migrationsDir: 'migrations'
  }
}

export default config
