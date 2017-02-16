var router = require('express').Router()

router.get('/', (req, res, next) => {
  res.redirect('http://alfan.coderhutan.com/bejometer')
})

module.exports = router
