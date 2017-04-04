Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: 'pink',
  accent: 'purple',
  warn: 'deep-orange',
  background: 'white',
})

new Vue({
  el: '#app',

  data: {
    bejometerName1: localStorage.bejometerName1 || '',
    bejometerDate1: localStorage.bejometerDate1 || '',
    bejometerName2: localStorage.bejometerName2 || '',
    bejometerDate2: localStorage.bejometerDate2 || '',
    consultationName: localStorage.consultationName || '',
    consultationDate: localStorage.consultationDate || '',
    tebakgenderName: localStorage.tebakgenderName || '',

    bejometerRequesting: false,
    bejometerResult: null,

    consultationRequesting: false,
    consultationResult: null,

    tebakgenderRequesting: false,
    tebakgenderResult: null,
  },

  methods: {
    bejometerSubmit() {
      this.bejometerRequesting = true
      this.bejometerResult = null

      let params = {
        name1: this.bejometerName1,
        date1: this.bejometerDate1,
        name2: this.bejometerName2,
        date2: this.bejometerDate2,
      }
      axios.get('/api/bejometer', {params})
      .then((response) => {
        this.bejometerResult = response.data
        return new Promise((resolve) => setTimeout(resolve, 1000))
      })
      .then(() => {
        let genderConfidence1 = this.bejometerResult.person1.genderConfidence
        let genderConfidence2 = this.bejometerResult.person2.genderConfidence
        if (this.human(genderConfidence1) && this.human(genderConfidence2)) {
          let match = Math.round(this.bejometerResult.match * 10000) / 10000
          let diff = 0.01
          this.bejometerResult.match = 0
          this.openDialog('bejometerResult')
          setTimeout(() => {
            let interval = setInterval(() => {
              if (diff < 0.00001) clearInterval(interval)
              else if (this.bejometerResult.match + diff > match) diff /= 10
              else this.bejometerResult.match += diff
            }, 50)
          }, 500)
        }
      })
      .catch(() => this.$refs.error.open())
      .then(() => this.bejometerRequesting = false)

      localStorage.bejometerName1 = this.bejometerName1
      localStorage.bejometerDate1 = this.bejometerDate1
      localStorage.bejometerName2 = this.bejometerName2
      localStorage.bejometerDate2 = this.bejometerDate2
    },

    consultationSubmit() {
      this.consultationRequesting = true
      this.consultationResult = null

      let params = {
        name: this.consultationName,
        date: this.consultationDate,
      }
      axios.get('/api/consultation', {params})
      .then((response) => {
        this.consultationResult = response.data
        return new Promise((resolve) => setTimeout(resolve, 1000))
      })
      .then(() => {
        if (this.human(this.consultationResult.person.genderConfidence))
          this.openDialog('consultationResult')
      })
      .catch(() => this.$refs.error.open())
      .then(() => this.consultationRequesting = false)

      localStorage.consultationName = this.consultationName
      localStorage.consultationDate = this.consultationDate
    },

    tebakgenderSubmit() {
      this.tebakgenderRequesting = true
      this.tebakgenderResult = null

      let params = {name: this.tebakgenderName}
      axios.get('/api/tebakgender', {params})
      .then((response) => {
        this.tebakgenderResult = response.data
        return new Promise((resolve) => setTimeout(resolve, 1000))
      })
      .then(() => this.openDialog('tebakgenderResult'))
      .catch(() => this.$refs.error.open())
      .then(() => this.tebakgenderRequesting = false)

      localStorage.tebakgenderName = this.tebakgenderName
    },

    bejometerBuildShareURL(name1, date1, name2, date2) {
      name1 = this.sanitize(name1 || '').toLowerCase()
      date1 = date1 || new Date().toISOString().slice(0, 10)
      name2 = this.sanitize(name2 || '').toLowerCase()
      date2 = date2 || new Date().toISOString().slice(0, 10)
      date1 = typeof date1 === 'number' ? new Date(date1).toISOString().slice(0, 10) : date1
      date2 = typeof date2 === 'number' ? new Date(date2).toISOString().slice(0, 10) : date2
      return `${location.origin}/bejometer/${name1}:${date1}&${name2}:${date2}`
    },

    openDialog(ref) {
      this.$refs[ref].open()
    },

    closeDialog(ref) {
      this.$refs[ref].close()
    },

    human(confidence) {
      return confidence > 0.33
    },

    sanitize(name) {
      return name.replace(/[^A-Za-z']/g, ' ').replace(/ +/g, ' ').trim().replace(/ /g, '-')
    },

    toTitleCase(text) {
      return text.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase()+word.slice(1)).join(' ')
    },

    toPercent(value) {
      return Math.round(value * 10000) / 100 + '%'
    },
  },
})

/*
consultationBuildShareURL = (name, date) {
  name = this.sanitize(name || '').toLowerCase()
  date = date || ''
  return `${location.origin}/consultation/${name}:${date}`
}

tebakgenderBuildShareURL = (name) {
  name = this.sanitize(name || '').toLowerCase()
  return `${location.origin}/tebakgender/${name}`
}
*/
