const router = new (require('express').Router)()
const client = require('mongodb').MongoClient

router.get('/', (req, res) => {
  let data = {
    production: process.env.NODE_ENV === 'production',
  }
  res.render('pawon', data)
})

router.get('/stream', (req, res) => {
  let connectionClosed = false
  req.connection.on('close', () => connectionClosed = true)

  res.set('Content-Type', 'text/event-stream')
  let getLog = (minDate) => {
    client.connect(process.env.MONGODB, (err, db) => {
      db.collection('log')
        .find({timestamp: {$gt: minDate}})
        .sort({timestamp: 1})
        .toArray((err, logs) => {
          logs.forEach((log) => {
            res.write(`data: ${JSON.stringify(log)}\n\n`)
            minDate = log.timestamp
          })
          res.flush()
          if (!connectionClosed) setTimeout(getLog, 1000, minDate)
        })
    })
  }
  getLog(new Date())
})

module.exports = router
