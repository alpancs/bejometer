var router = require('express').Router()
var tebakgender = require('tebakgender')

router.get('/bejometer/:name1@:date1::name2@:date2', (req, res, next) => {
  res.json(req.params)
})

router.get('/tebakgender/:name', (req, res, next) => {
  let prediction = tebakgender(req.params.name)
  res.json({gender: prediction.gender, confidence: prediction.confidence})
})

router.get('/tebakgenders/:names', (req, res, next) => {
  let names = req.params.names.split(/ *, */)
  let predictions = names.map(tebakgender).map(prediction => ({gender: prediction.gender, confidence: prediction.confidence}))
  res.json(predictions)
})

module.exports = router
