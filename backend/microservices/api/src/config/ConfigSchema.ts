export default {
  web: {
    port: {
      format: Number,
      default: 3000,
      env: 'WEB_PORT'
    }
  },
  amqp: {
    url: {
      format: String,
      default: 'amqp://localhost',
      sensitive: true,
      env: 'AMQP_URL'
    }
  }
} as const
