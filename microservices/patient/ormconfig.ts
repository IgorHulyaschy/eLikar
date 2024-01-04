import { ConnectionOptions } from 'typeorm'

import { Patient } from './src/patient/Patient'
import { MedicalHistory } from './src/medical-history/MedicalHistory'

const config: ConnectionOptions = {
  url: process.env.POSTGRES_URL ?? 'postgres://postgres:postgres@localhost:5432/postgres',
  type: 'postgres',
  migrations: ['migrations/*.ts'],
  entities: [Patient, MedicalHistory],
  cli: {
    migrationsDir: 'migrations'
  }
}

export default config
