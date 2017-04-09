const oneDay = 24 * 60 * 60 * 1000
const javaDays = 'PON WAGE KLIWON LEGI PAHING'.split(' ')
const indonesiaDays = "KAMIS JUM'AT SABTU AHAD SENIN SELASA RABU".split(' ')
const kamisPonTime = Date.parse('1994-07-28')

let diffDayMod = (time, mod) =>
  (mod + ~~((time - kamisPonTime) / oneDay) % mod) % mod

exports.javaDay = (time) => javaDays[diffDayMod(time, 5)]
exports.indonesiaDay = (time) => indonesiaDays[diffDayMod(time, 7)]
