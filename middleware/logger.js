const winston = require('winston')
require('winston-mongodb').MongoDB

winston.add(winston.transports.MongoDB, {db: process.env.MONGODB_URL})
winston.remove(winston.transports.Console)

global.logger = winston

module.exports = (req, res, next) => {
  let startTime = Date.now()
  next()
  global.logger.info('request', {
    path: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    statusCode: res.statusCode,
    elapsedTime: Date.now() - startTime,
  })
}
