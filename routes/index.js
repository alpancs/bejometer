const router = new (require('express').Router)()
const bejometer = require('modules/bejometer')
const sanitize = require('tebakgender/lib/sanitize')
const title = {L: 'mas', P: 'mbak'}

router.get('/', (req, res) => {
  let data = {
    production: process.env.NODE_ENV === 'production',
  }
  res.render('index', data)
})

router.get('/bejometer/:name1::date1&:name2::date2', (req, res) => {
  let name1 = toTitleCase(sanitize(req.params.name1))
  let date1 = new Date(req.params.date1)
  let name2 = toTitleCase(sanitize(req.params.name2))
  let date2 = new Date(req.params.date2)

  let result = bejometer(name1, date1.getTime(), name2, date2.getTime())
  let title1 = title[result.person1.estimation.gender]
  let title2 = title[result.person2.estimation.gender]
  let day1 = toTitleCase(result.person1.indonesiaDay + ' ' + result.person1.javaDay)
  let day2 = toTitleCase(result.person2.indonesiaDay + ' ' + result.person2.javaDay)
  let percent = Math.round(result.match * 10000) / 100 + '%'

  let data = {
    production: process.env.NODE_ENV === 'production',
    description: `Hasil Bejometer ${title1} ${name1} dengan ${title2} ${name2}`,
    title1, name1,
    date1: dateToTextField(date1), day1,
    title2, name2,
    date2: dateToTextField(date2), day2,
    percent,
    toTitleCase,
  }
  res.render('bejometer', data)

  global.logger.info('bejometer-static', {
    name1, date1: dateToTextField(date1),
    name2, date2: dateToTextField(date2),
    result,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  })
})

let toTitleCase = (text) => text.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase()+word.slice(1)).join(' ')
let dateToTextField = (date) => `${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(date.getDate())}`
let twoDigits = (number) => number < 10 ? '0' + number : number.toString()

module.exports = router
