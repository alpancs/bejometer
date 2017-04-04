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
  let name1 = sanitize(req.params.name1)
  let date1 = Date.parse(req.params.date1)
  let name2 = sanitize(req.params.name2)
  let date2 = Date.parse(req.params.date2)
  res.json(bejometer(name1, date1, name2, date2))
})

module.exports = router
