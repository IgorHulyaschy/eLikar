import { Nurse } from '../nurse/Nurse'

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
      default: [Nurse] as any[]
    },
    url: {
      format: String,
      default: 'postgres://localhost:postgres',
      env: 'POSTGRES_URL'
    },
    logging: {
      default: false
    }
  }
} as const
