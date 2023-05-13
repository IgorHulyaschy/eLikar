export default {
  amqp: {
    url: {
      format: String,
      default: 'amqp://localhost',
      sensitive: true,
      env: 'AMQP_URL'
    }
  },
  application: {
    name: { default: require('../../package.json').name as string }
  }
} as const
