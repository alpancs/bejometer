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
  let suggestions = findSuggestions(name, time, 6)
  res.send(suggestions)
})

let filterPrediction = (prediction) =>
  ({gender: prediction.gender, confidence: prediction.confidence})

let findSuggestions = (name, time, limit) => {
  let minMatch = 1
  let suggestions = []
  let i = randomNumber()
  while (suggestions.length < limit) {
    i = (i + randomNumber()) % students.length
    let student = students[i]
    let result = bejometer(name, time, student.name, student.date_of_birth)
    if (result.match >= minMatch) {
      suggestions.push(student)
      minMatch *= 0.99
    }
    if (suggestions.length === limit) break
  }
  return suggestions
}

let randomNumber = () => Math.floor(Math.random() * students.length)

for (let student of students)
  student.date_of_birth = Date.parse(student.date_of_birth)

module.exports = router
