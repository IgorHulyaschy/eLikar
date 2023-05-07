import { ConnectionOptions } from 'typeorm'

import { MedicineReport } from './src/medicine-report/MedicineReport'

const config: ConnectionOptions = {
  url: process.env.POSTGRES_URL ?? 'postgres://localhost/postgres',
  type: 'postgres',
  migrations: ['migrations/*.ts'],
  entities: [MedicineReport],
  cli: {
    migrationsDir: 'migrations'
  }
}

export default config
