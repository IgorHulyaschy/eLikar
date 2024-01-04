import { MedicalHistory } from '../medical-history/MedicalHistory'
import { Patient } from '../patient/Patient'

export default {
  amqp: {
    url: {
      format: String,
      default: 'amqp://localhost',
      sensitive: true,
      env: 'AMQP_URL'
    }
  },
  typeorm: {
    type: {
      default: 'postgres'
    },
    entities: {
      default: [Patient, MedicalHistory] as any[]
    },
    url: {
      format: String,
      default: 'postgres://localhost:postgres',
      env: 'POSTGRES_URL'
    },
    logging: {
      default: true
    }
  },
  application: {
    name: { default: require('../../package.json').name as string }
  }
} as const
