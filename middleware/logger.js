const winston = require('winston')

if (process.env.NODE_ENV === 'production') {
  winston.remove(winston.transports.Console)
  require('winston-mongodb').MongoDB
  let option = {db: process.env.MONGODB}
  winston.add(winston.transports.MongoDB, option)
}

global.logger = winston

module.exports = (req, res, next) => {
  let startTime = Date.now()
  next()
  global.logger.info('request', {
    path: req.originalUrl,
    ip: req.ip,
    user_agent: req.get('User-Agent'),
    statusCode: res.statusCode,
    elapsedTime: Date.now() - startTime,
  })
}
