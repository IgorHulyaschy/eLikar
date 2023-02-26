/* eslint-disable @typescript-eslint/no-var-requires */
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
  },
  bcrypt: {
    saltRounds: {
      format: Number,
      default: 10,
      env: 'BCRYPT_SALT_ROUNDS'
    }
  },
  jwt: {
    secret: {
      format: String,
      default: 'jwt_secret',
      env: 'JWT_SECRET'
    }
  },
  application: {
    name: { default: require('../../package.json').name as string }
  }
} as const
