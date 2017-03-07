const express = require('express')
const router = new express.Router()
const bejometer = require('modules/bejometer')
const sanitize = require('tebakgender/lib/sanitize')

router.get('/', (req, res, next) => {
  let data = {
    title: 'Bejometer',
    production: process.env.NODE_ENV === 'production',
  }
  res.render('index', data)
})

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


module.exports = router
