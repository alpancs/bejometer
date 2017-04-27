const tebakgender = require('tebakgender')
const bejometer = require('./bejometer')
const students = require('../corpus/data-siswa-clean')

for (let student of students)
  student.dateOfBirth = Date.parse(student.dateOfBirth)

let people = {
  L: students.filter((student) => student.gender === 'L'),
  P: students.filter((student) => student.gender === 'P'),
}

let suggestion = (name, time, limit) => {
  let targets = tebakgender(name).gender === 'L' ? people.P : people.L
  let length = targets.length
  let minMatch = 0.999
  let failure = 0
  let suggestions = []
  let tryTime = 0
  let i = randomNumber(length)
  while (suggestions.length < limit && ++tryTime < 10000) {
    i = (i + randomNumber(length)) % length
    let target = targets[i]
    let result = bejometer(name, time, target.name, target.dateOfBirth)
    if (result.match >= minMatch) {
      suggestions.push({
        match: result.match,
        name: target.name,
        placeOfBirth: target.placeOfBirth,
        dateOfBirth: new Date(target.dateOfBirth).toISOString().slice(0, 10),
      })
      failure >>= 1
    } else {
      ++failure
    }
    if (failure > 100) minMatch *= 0.999
  }
  return suggestions
}

let randomNumber = (length) => ~~(Math.random() * length)

module.exports = suggestion
