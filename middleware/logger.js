const bunyan = require('bunyan')
const logger = bunyan.createLogger({name: 'bejometer'})

module.exports = (req, res, next) => {
  let startTime = Date.now()
  next()
  logger.info({
    path: req.originalUrl,
    ip: req.ip,
    user_agent: req.get('User-Agent'),
    elapsed_time: Date.now() - startTime,
  })
}
