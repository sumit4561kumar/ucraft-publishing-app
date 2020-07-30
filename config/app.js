const convict = require('convict')
require('dotenv').config()

const config = convict({
  app: {
    name: {
      doc: 'Ucraft Publishing App',
      format: String,
      default: 'Ucraft Publishing App'
    }
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 4000,
    env: 'PORT'
  },
  log_level: {
    doc: 'level of logs to show',
    format: String,
    default: 'debug',
    env: 'LOG_LEVEL'
  },
  sequelize: {
    name: {
      default: '',
      env: 'DB_NAME'
    },
    user: {
      default: '',
      env: 'DB_USER'
    },
    password: {
      default: '',
      env: 'DB_PASSWORD'
    },
    host: {
      default: '',
      env: 'DB_HOST'
    },
    port: {
      default: '',
      env: 'DB_PORT'
    }
  }
})
config.validate({ allowed: 'strict' })

module.exports = config
