process.env.NODE_PATH = __dirname
require('module').Module._initPaths()

const express = require('express')
const compression = require('compression')
const path = require('path')
const favicon = require('serve-favicon')

const index = require('routes/index')
const api = require('routes/api')
const logger = require('middleware/logger')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(compression())
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))

app.use(logger)
app.use('/', index)
app.use('/api', api)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
