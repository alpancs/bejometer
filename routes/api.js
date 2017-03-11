const express = require('express')
const router = new express.Router()
const tebakgender = require('tebakgender')
const sanitize = require('tebakgender/lib/sanitize')
const bejometer = require('modules/bejometer')
const suggestion = require('modules/suggestion')

router.get('/bejometer/:name1::date1&:name2::date2', (req, res) => {
  let name1 = sanitize(req.params.name1)
  let time1 = Date.parse(req.params.date1)
  let name2 = sanitize(req.params.name2)
  let time2 = Date.parse(req.params.date2)
  let result = bejometer(name1, time1, name2, time2)
  res.json({
    match: result.match,
    person1: {
      gender: result.person1.estimation.gender,
      genderConfidence: result.person1.estimation.confidence,
      indonesiaDay: result.person1.indonesiaDay,
      javaDay: result.person1.javaDay,
    },
    person2: {
      gender: result.person2.estimation.gender,
      genderConfidence: result.person2.estimation.confidence,
      indonesiaDay: result.person2.indonesiaDay,
      javaDay: result.person2.javaDay,
    },
  })
})

router.get('/tebakgender/:name', (req, res) => {
  res.json(filterPrediction(tebakgender(req.params.name)))
})

router.get('/bulk-tebakgender/:names', (req, res) => {
  let names = req.params.names.split(/ *, */)
  let predictions = names.map(tebakgender).map(filterPrediction)
  res.json(predictions)
})

router.get('/consultation/:name::date', (req, res) => {
  let name = sanitize(req.params.name)
  let time = Date.parse(req.params.date)
  let limit = parseInt(req.query.limit || '0') || 6
  limit = limit > 100 ? 100 : limit
  let suggestions = suggestion(name, time, limit)
  res.json(suggestions.map(filterSuggestion))
})

let filterPrediction = (prediction) => ({
  gender: prediction.gender,
  confidence: prediction.confidence,
})

let filterSuggestion = (sug) => ({
  match: sug.match,
  name: sug.person.name,
  gender: sug.person.gender,
  placeOfBirth: sug.person.placeOfBirth,
  dateOfBirth: sug.person.dateOfBirth,
})

module.exports = router
