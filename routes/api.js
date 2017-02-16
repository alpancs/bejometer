var router = require('express').Router()
var tebakgender = require('tebakgender')

router.get('/bejo/:name1/:name2', (req, res, next) => {
  res.json({bejo: 0})
})

router.get('/tebakgender/:name', (req, res, next) => {
  res.json(tebakgender(req.params.name))
})

module.exports = router
