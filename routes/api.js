const express = require('express')
const router = new express.Router()
const tebakgender = require('tebakgender')
const sanitize = require('tebakgender/lib/sanitize')
const bejometer = require('modules/bejometer')
const students = require('modules/corpus/data-siswa-clean')

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

router.get('/consultation/:name::date', (req, res) => {
  let name = sanitize(req.params.name).toUpperCase()
  let time = Date.parse(req.params.date)
  let limit = parseInt(req.query.limit || '0') || 6
  limit = limit > 1000 ? 1000 : limit
  let suggestions = findSuggestions(name, time, limit)
  res.send(suggestions)
})

let filterPrediction = (prediction) => ({
  gender: prediction.gender,
  confidence: prediction.confidence,
})

let filterStudent = (student) => ({
  name: student.name,
  gender: student.gender,
  place_of_birth: student.place_of_birth,
  date_of_birth: student.date_of_birth,
})

let findSuggestions = (name, time, limit) => {
  let targets = tebakgender(name).gender === 'L' ? people.P : people.L
  let length = targets.length
  let minMatch = 0.999
  let failure = 0
  let suggestions = []
  let i = randomNumber(length)
  while (suggestions.length < limit) {
    i = (i + randomNumber(length)) % length
    let target = targets[i]
    let result = bejometer(name, time, target.name, target.date_of_birth)
    if (result.match >= minMatch) {
      suggestions.push({match: result.match, person: filterStudent(target)})
      failure >>= 1
    } else {
      ++failure
    }
    if (failure > 100) minMatch *= 0.999
    if (suggestions.length === limit) break
  }
  return suggestions
}

let randomNumber = (length) => ~~(Math.random() * length)

for (let student of students)
  student.date_of_birth = Date.parse(student.date_of_birth)

let people = {
  L: students.filter((student) => student.gender === 'L'),
  P: students.filter((student) => student.gender === 'P'),
}

module.exports = router
