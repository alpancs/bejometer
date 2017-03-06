const express = require('express')
const router = new express.Router()
const tebakgender = require('tebakgender')
const sanitize = require('tebakgender/lib/sanitize')
const bejometer = require('modules/bejometer')

router.get('/bejometer/:name1::date1&:name2::date2', (req, res) => {
  let name1 = sanitize(req.params.name1).toUpperCase()
  let time1 = Date.parse(req.params.date1)
  let name2 = sanitize(req.params.name2).toUpperCase()
  let time2 = Date.parse(req.params.date2)
  let result = bejometer(name1, time1, name2, time2)
  res.json({
    match: result.match,
    person1: {
      gender: result.person1.estimation.gender,
      gender_confidence: result.person1.estimation.confidence,
      indonesia_day: result.person1.indonesiaDay,
      java_day: result.person1.javaDay,
    },
    person2: {
      gender: result.person2.estimation.gender,
      gender_confidence: result.person2.estimation.confidence,
      indonesia_day: result.person2.indonesiaDay,
      java_day: result.person2.javaDay,
    },
  })
})

router.get('/tebakgender/:name', (req, res) => {
  res.json(filterPrediction(tebakgender(req.params.name)))
})

router.get('/tebakgenders/:names', (req, res) => {
  let names = req.params.names.split(/ *, */)
  let predictions = names.map(tebakgender).map(filterPrediction)
  res.json(predictions)
})

let filterPrediction = (prediction) =>
  ({gender: prediction.gender, confidence: prediction.confidence})

module.exports = router
