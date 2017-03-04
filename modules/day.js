const oneDay = 24 * 60 * 60 * 1000
const javaDays = 'PON WAGE KLIWON LEGI PAHING'.split(' ')
const indonesiaDays = "KAMIS JUM'AT SABTU AHAD SENIN SELASA RABU".split(' ')
const kamisPonTime = new Date(1994, 6, 28).getTime()

let diffDayMod = (time, mod) =>
  (mod + Math.floor((time - kamisPonTime) / oneDay) % mod) % mod

exports.javaDay = time => javaDays[diffDayMod(time, 5)]
exports.indonesiaDay = time => indonesiaDays[diffDayMod(time, 7)]
