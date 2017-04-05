const winston = require('winston')

if (process.env.NODE_ENV === 'production') {
  winston.remove(winston.transports.Console)
  require('winston-mongodb').MongoDB
  let option = {
    db: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`,
  }
  console.log(option);
  winston.add(winston.transports.MongoDB, option)
}

let logger = winston

module.exports = (req, res, next) => {
  let startTime = Date.now()
  next()
  logger.info({
    path: req.originalUrl,
    ip: req.ip,
    user_agent: req.get('User-Agent'),
    elapsedTime: Date.now() - startTime,
  })
}
