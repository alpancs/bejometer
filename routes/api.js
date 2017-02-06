var express = require('express');
var router = express.Router();

router.get('/hitung-bejo/:name1/:name2', function(req, res, next) {
  res.json({bejo: 0});
});

router.get('/tebak-gender/:name', function(req, res, next) {
  res.json({gender: 'M'});
});

module.exports = router;
