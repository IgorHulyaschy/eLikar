import { MedicineEntity } from '../medicine/MedicineRepository'

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
      default: [MedicineEntity] as any[]
    },
    url: {
      format: String,
      default: 'postgres://localhost:postgres',
      env: 'POSTGRES_URL'
    },
    logging: {
      default: false
    },
    autoLoadEntities: { default: true }
  },
  application: {
    name: { default: require('../../package.json').name as string }
  }
} as const
