Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: 'pink',
  accent: 'purple',
  warn: 'grey',
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
    bejometerError: null,
    bejometerShareURL: null,

    consultationRequesting: false,
    consultationResult: null,
    consultationError: null,
    consultationShareURL: null,

    tebakgenderRequesting: false,
    tebakgenderResult: null,
    tebakgenderError: null,
    tebakgenderShareURL: null,
  },

  methods: {
    bejometerSubmit() {
      this.bejometerRequesting = true
      this.openDialog('bejometerResult')

      this.bejometerResult = null
      this.bejometerShareURL = null
      this.bejometerError = null

      let params = {
        name1: this.bejometerName1,
        date1: this.bejometerDate1,
        name2: this.bejometerName2,
        date2: this.bejometerDate2,
      }
      axios.get('/api/bejometer', {params})
      .then((response) => {
        this.bejometerResult = response.data
        this.bejometerShareURL = this.bejometerBuildShareURL(
          this.bejometerName1,
          this.bejometerDate1,
          this.bejometerName2,
          this.bejometerDate2
        )
      })
      .catch((error) => this.bejometerError = error)
      .then(() => this.bejometerRequesting = false)

      localStorage.bejometerName1 = this.bejometerName1
      localStorage.bejometerDate1 = this.bejometerDate1
      localStorage.bejometerName2 = this.bejometerName2
      localStorage.bejometerDate2 = this.bejometerDate2
    },

    consultationSubmit() {
      this.consultationRequesting = true
      this.openDialog('consultationResult')

      this.consultationResult = null
      this.consultationShareURL = null
      this.consultationError = null

      let params = {
        name: this.consultationName,
        date: this.consultationDate,
      }
      axios.get('/api/consultation', {params})
      .then((response) => {
        this.consultationResult = response.data
        this.consultationShareURL = this.consultationBuildShareURL()
      })
      .catch((error) => this.consultationError = error)
      .then(() => this.consultationRequesting = false)

      localStorage.consultationName = this.consultationName
      localStorage.consultationDate = this.consultationDate
    },

    tebakgenderSubmit() {
      this.tebakgenderRequesting = true
      this.openDialog('tebakgenderResult')

      this.tebakgenderResult = null
      this.tebakgenderShareURL = null
      this.tebakgenderError = null

      let params = {name: this.tebakgenderName}
      axios.get('/api/tebakgender', {params})
      .then((response) => {
        this.tebakgenderResult = response.data
        this.tebakgenderShareURL = this.tebakgenderBuildShareURL()
      })
      .catch((error) => this.tebakgenderError = error)
      .then(() => this.tebakgenderRequesting = false)

      localStorage.tebakgenderName = this.tebakgenderName
    },

    bejometerBuildShareURL(name1, date1, name2, date2) {
      name1 = this.sanitize(name1 || '').toLowerCase()
      date1 = date1 || ''
      name2 = this.sanitize(name2 || '').toLowerCase()
      date2 = date2 || ''
      return `${location.origin}/bejometer/${name1}:${date1}&${name2}:${date2}`
    },

    consultationBuildShareURL() {
      let name = this.sanitize(this.consultationName || '').toLowerCase()
      let date = this.consultationDate || ''
      return `${location.origin}/consultation/${name}:${date}`
    },

    tebakgenderBuildShareURL() {
      let name = this.sanitize(this.tebakgenderName || '').toLowerCase()
      return `${location.origin}/tebakgender/${name}`
    },

    sanitize(name) {
      return name.replace(/[^A-Za-z']/g, ' ')
        .replace(/ +/g, ' ')
        .trim()
        .replace(/ /g, '-')
    },

    toTitleCase(text) {
      return text.toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase()+word.slice(1))
        .join(' ')
    },

    toPercent(value) {
      return Math.round(value * 10000) / 100 + '%'
    },

    openDialog(ref) {
      this.$refs[ref].open()
    },

    closeDialog(ref) {
      this.$refs[ref].close()
    },
  },
})
