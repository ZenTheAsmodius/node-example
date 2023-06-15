const NODE_ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || '3000'
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/node-example'
const JWT_DURATION = parseInt(process.env.JWT_DURATION) || 3600
const JWT_CIPHER = process.env.JWT_CIPHER || 'r4nd0m5tr1ng'

module.exports = {
  NODE_ENV,
  PORT,
  MONGO_URI,
  JWT_CIPHER,
  JWT_DURATION
}
