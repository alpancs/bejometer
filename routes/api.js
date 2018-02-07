const router = new (require('express').Router)()
const tebakgender = require('tebakgender')
const bejometer = require('../modules/bejometer')
const suggestion = require('../modules/suggestion')

router.get('/bejometer', (req, res) => {
  let name1 = req.query.name1 || ''
  let time1 = Date.parse(req.query.date1) || Date.now()
  let name2 = req.query.name2 || ''
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

  global.save({
    type: 'Bejometer API',
    name1,
    date1: req.query.date1 || new Date(time1).toISOString().slice(0, 10),
    name2,
    date2: req.query.date2 || new Date(time2).toISOString().slice(0, 10),
    result,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  })
})

router.get('/tebakgender', (req, res) => {
  let name = req.query.name || ''
  let response = filterPrediction(tebakgender(name))
  res.json(response)

  global.save({
    type: 'Tebakgender API',
    name,
    result: response,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  })
})

router.get('/bulk-tebakgender', (req, res) => {
  let names = req.query.names || []
  if (typeof(names) === 'string') names = [names]
  let predictions = names.map((name) => tebakgender(name)).map(filterPrediction)
  res.json(predictions)
})

router.get('/consultation', (req, res) => {
  let name = req.query.name || ''
  let time = Date.parse(req.query.date) || Date.now()
  let limit = parseInt(req.query.limit || '0') || 6
  limit = limit > 100 ? 100 : limit
  let suggestions = suggestion(name, time, limit)
  let prediction = tebakgender(name)
  let response = {
    person: {
      gender: prediction.gender,
      genderConfidence: prediction.confidence,
    },
    suggestions,
  }
  res.json(response)

  global.save({
    type: 'Consultation API',
    name,
    date: req.query.date || new Date(time).toISOString().slice(0, 10),
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

module.exports = router
