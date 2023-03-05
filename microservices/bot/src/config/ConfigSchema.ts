/* eslint-disable @typescript-eslint/no-var-requires */

import { Bot } from '../bot/Bot'

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
      default: [Bot] as any[]
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
  bot: {
    token: {
      format: String,
      default: '',
      env: 'TG_BOT_TOKEN'
    }
  },
  redis: {
    url: {
      format: String,
      default: ''
    }
  },
  application: {
    name: { default: require('../../package.json').name as string }
  }
} as const
