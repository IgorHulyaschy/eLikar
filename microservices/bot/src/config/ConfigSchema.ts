/* eslint-disable @typescript-eslint/no-var-requires */
// import { Hospital } from '../hospital/Hospital'

export default {
  amqp: {
    url: {
      format: String,
      default: 'amqp://localhost',
      sensitive: true,
      env: 'AMQP_URL'
    }
  },
  // typeorm: {
  //   type: {
  //     default: 'postgres'
  //   },
  //   entities: {
  //     default: [Hospital] as any[]
  //   },
  //   url: {
  //     format: String,
  //     default: 'postgres://localhost:postgres',
  //     env: 'POSTGRES_URL'
  //   },
  //   logging: {
  //     default: false
  //   }
  // },
  bot: {
    token: {
      format: String,
      default: '',
      env: 'TG_BOT_TOKEN'
    }
  },
  application: {
    name: { default: require('../../package.json').name as string }
  }
} as const
