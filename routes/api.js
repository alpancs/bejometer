const router = require('express').Router()
const tebakgender = require('tebakgender')
const sanitize = require('tebakgender/lib/sanitize')
const bejometer = require('modules/bejometer')

router.get('/bejometer/:name1::date1&:name2::date2', (req, res) => {
  let name1 = sanitize(req.params.name1).toUpperCase()
  let time1 = Date.parse(req.params.date1)
  let name2 = sanitize(req.params.name2).toUpperCase()
  let time2 = Date.parse(req.params.date2)
  res.json(bejometer(name1, time1, name2, time2))
})

router.get('/tebakgender/:name', (req, res) => {
  let prediction = tebakgender(req.params.name)
  res.json({gender: prediction.gender, confidence: prediction.confidence})
})

router.get('/tebakgenders/:names', (req, res) => {
  let names = req.params.names.split(/ *, */)
  let predictions = names.map(tebakgender).map(prediction => ({gender: prediction.gender, confidence: prediction.confidence}))
  res.json(predictions)
})

module.exports = router
