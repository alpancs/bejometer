const tebakgender = require('tebakgender')
const day = require('modules/day')

const mod = 101

module.exports = (name1, time1, name2, time2) => {
  let javaDay1 = day.javaDay(time1)
  let javaDay2 = day.javaDay(time2)
  let indonesiaDay1 = day.indonesiaDay(time1)
  let indonesiaDay2 = day.indonesiaDay(time2)

  let hash1 = hash(name1) * hash(javaDay1)
  let hash2 = hash(name2) * hash(javaDay2)
  let value1 = (hash1 + hash2) % mod
  let value2 = (hash1 * hash2) % mod
  if (value1 > value2) [value1, value2] = [value2, value1]

  let estimation1 = tebakgender(name1, true)
  let estimation2 = tebakgender(name2, true)

  let match = (estimation1.gender !== estimation2.gender) * value1 / value2
  return {
    match,
    person1: {
      estimation: estimation1,
      indonesiaDay: indonesiaDay1,
      javaDay: javaDay1,
    },
    person2: {
      estimation: estimation2,
      indonesiaDay: indonesiaDay2,
      javaDay: javaDay2,
    },
  }
}

let hash = (array) => { // djb2. source: http://www.cse.yorku.ca/~oz/hash.html
  let h = 5381
  for (let c of array) h = ((h << 5) + h + c.codePointAt(0)) % mod
  return h
}
