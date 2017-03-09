const express = require('express')
const router = new express.Router()
// const bejometer = require('modules/bejometer')
// const sanitize = require('tebakgender/lib/sanitize')

router.get('/', (req, res, next) => {
  let data = {
    production: process.env.NODE_ENV === 'production',
  }
  res.render('index', data)
})

module.exports = router
