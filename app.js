const express = require('express')
const compression = require('compression')
const path = require('path')
const favicon = require('serve-favicon')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(compression())
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))

app.use(require('./middleware/logger'))
app.use('/', require('./routes/index'))
app.use('/api', require('./routes/api'))

app.use(require('./middleware/not-found'))
app.use(require('./middleware/error'))

module.exports = app

const mongodbPromise = require('mongodb').MongoClient.connect(process.env.MONGODB_URL)
global.save = (data) => {
  data.timestamp = new Date()
  return mongodbPromise
    .then((db) => db.collection('history').insert(data))
    .catch(global.logger.error)
}
