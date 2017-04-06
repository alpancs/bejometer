const express = require('express')
const router = new express.Router()
const bejometer = require('modules/bejometer')
const sanitize = require('tebakgender/lib/sanitize')

router.get('/', (req, res) => {
  let data = {
    production: process.env.NODE_ENV === 'production',
  }
  res.render('index', data)
})

router.get('/bejometer/:name1::date1&:name2::date2', (req, res) => {
  let name1 = toTitleCase(sanitize(req.params.name1))
  let date1 = Date.parse(req.params.date1)
  let name2 = toTitleCase(sanitize(req.params.name2))
  let date2 = Date.parse(req.params.date2)

  let result = bejometer(name1, date1, name2, date2)
  let percent = Math.round(result.match * 10000) / 100 + '%'

  let data = {
    production: process.env.NODE_ENV === 'production',
    description: `Hasil Bejometer ${name1} dengan ${name2}: ${percent} jodoh!`,
    name1, date1, name2, date2, result,
  }
  res.render('bejometer', data)
})

let toTitleCase = (text) => text.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase()+word.slice(1)).join(' ')

module.exports = router
