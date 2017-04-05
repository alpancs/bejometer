const express = require('express')
const router = new express.Router()
const tebakgender = require('tebakgender')
const sanitize = require('tebakgender/lib/sanitize')
const bejometer = require('modules/bejometer')
const suggestion = require('modules/suggestion')

router.get('/bejometer', (req, res) => {
  let name1 = sanitize(req.query.name1 || '')
  let time1 = Date.parse(req.query.date1) || Date.now()
  let name2 = sanitize(req.query.name2 || '')
  let time2 = Date.parse(req.query.date2) || Date.now()
  let result = bejometer(name1, time1, name2, time2)
  let response = {
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
  }
  res.json(response)

  global.logger.info('bejometer', {
    name1,
    date1: time1,
    name2,
    date2: time2,
    result: response,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  })
})

router.get('/tebakgender', (req, res) => {
  let name = sanitize(req.query.name || '')
  let response = filterPrediction(tebakgender(name, true))
  res.json(response)

  global.logger.info('tebakgender', {
    name,
    result: response,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  })
})

router.get('/bulk-tebakgender', (req, res) => {
  let names = req.query.names || []
  let predictions = names.map(tebakgender).map(filterPrediction)
  res.json(predictions)
})

router.get('/consultation', (req, res) => {
  let name = sanitize(req.query.name || '')
  let time = Date.parse(req.query.date) || Date.now()
  let limit = parseInt(req.query.limit || '0') || 6
  limit = limit > 100 ? 100 : limit
  let suggestions = name ? suggestion(name, time, limit) : []
  let prediction = tebakgender(name, true)
  let response = {
    person: {
      gender: prediction.gender,
      genderConfidence: prediction.confidence,
    },
    suggestions: suggestions.map(filterSuggestion),
  }
  res.json(response)

  global.logger.info('consultation', {
    name,
    date: time,
    limit,
    result: response,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  })
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
