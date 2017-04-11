const router = new (require('express').Router)()
const client = require('mongodb').MongoClient

router.get('/', (req, res) => {
  let closed = false
  req.connection.on('close', () => closed = true)

  res.set('Content-Type', 'text/event-stream')
  let getLog = (offset) => {
    client.connect(process.env.MONGODB, (err, db) => {
      db.collection('log')
        .find({})
        .sort({timestamp: -1})
        .limit(1)
        .skip(offset)
        .toArray((err, logs) => {
          res.write(`data: ${JSON.stringify(logs[0])}\n\n`)
          res.flush()
          if (!closed) setTimeout(getLog, 1000, offset + 1)
        })
    })
  }
  getLog(0)
})

module.exports = router
