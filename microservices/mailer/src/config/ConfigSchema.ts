/* eslint-disable @typescript-eslint/no-var-requires */
export default {
  amqp: {
    url: {
      format: String,
      default: 'amqp://localhost',
      sensitive: true,
      env: 'AMQP_URL'
    }
  },
  sendpulse: {
    grantType: {
      format: String,
      default: 'client_credentials',
      env: 'SENDPULSE_GRANT_TYPE'
    },
    clientId: {
      format: String,
      default: '',
      env: 'SENDPULSE_CLIENT_ID'
    },
    clientSecret: {
      format: String,
      default: '',
      env: 'SENDPULSE_CLIENT_SECRET'
    },
    from: {
      format: String,
      default: '',
      env: 'SENDPULSE_FROM'
    },
    senderName: {
      format: String,
      default: 'elikar',
      env: 'SENDPULSE_SENDER_NAME'
    }
  },
  mailgun: {
    apiKey: {
      format: String,
      default: '',
      env: 'MAILGUN_API_KEY'
    },
    domain: {
      format: String,
      default: '',
      env: 'MAILGUN_DOMAIN'
    }
  },
  application: {
    name: { default: require('../../package.json').name as string }
  }
} as const
