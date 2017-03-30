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
    bejometerInput: localStorage.bejometerInput ?
      JSON.parse(localStorage.bejometerInput) : {},
    consultationInput: localStorage.consultationInput ?
      JSON.parse(localStorage.consultationInput) : {},
    tebakgenderInput: localStorage.tebakgenderInput ?
      JSON.parse(localStorage.tebakgenderInput) : {},

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
        name1: this.bejometerInput.name1,
        date1: this.bejometerInput.date1,
        name2: this.bejometerInput.name2,
        date2: this.bejometerInput.date2,
      }
      axios.get('/api/bejometer', {params})
        .then((response) => {
          this.bejometerResult = response.data
          this.bejometerShareURL = this.bejometerBuildShareURL()
        })
        .catch((error) => this.bejometerError = error)
        .then(() => this.bejometerRequesting = false)

      localStorage.bejometerInput = JSON.stringify(this.bejometerInput)
    },

    consultationSubmit() {
      this.consultationRequesting = true
      this.openDialog('consultationResult')

      this.consultationResult = null
      this.consultationShareURL = null
      this.consultationError = null

      let params = {
        name: this.consultationInput.name,
        date: this.consultationInput.date,
      }
      axios.get('/api/consultation', {params})
        .then((response) => {
          this.consultationResult = response.data
          this.consultationShareURL = this.consultationBuildShareURL()
        })
        .catch((error) => this.consultationError = error)
        .then(() => this.consultationRequesting = false)

      localStorage.consultationInput = JSON.stringify(this.consultationInput)
    },

    tebakgenderSubmit() {
      this.tebakgenderRequesting = true
      this.openDialog('tebakgenderResult')

      this.tebakgenderResult = null
      this.tebakgenderShareURL = null
      this.tebakgenderError = null

      let params = {name: this.tebakgenderInput.name}
      axios.get('/api/tebakgender', {params})
        .then((response) => {
          this.tebakgenderResult = response.data
          this.tebakgenderShareURL = this.tebakgenderBuildShareURL()
        })
        .catch((error) => this.tebakgenderError = error)
        .then(() => this.tebakgenderRequesting = false)

      localStorage.tebakgenderInput = JSON.stringify(this.tebakgenderInput)
    },

    bejometerBuildShareURL() {
      let name1 = this.sanitize(this.bejometerInput.name1 || '')
      let date1 = this.bejometerInput.date1 || ''
      let name2 = this.sanitize(this.bejometerInput.name2 || '')
      let date2 = this.bejometerInput.date2 || ''
      return `${location.origin}/bejometer/${name1}:${date1}&${name2}:${date2}`
    },

    consultationBuildShareURL() {
      let name = this.sanitize(this.consultationInput.name || '')
      let date = this.consultationInput.date || ''
      return `${location.origin}/consultation/${name}:${date}`
    },

    tebakgenderBuildShareURL() {
      let name = this.sanitize(this.tebakgenderInput.name || '')
      return `${location.origin}/tebakgender/${name}`
    },

    sanitize(name) {
      return name.replace(/[^A-Za-z']/g, ' ')
        .replace(/ +/g, ' ')
        .trim()
        .replace(/ /g, '-')
    },

    toTitleCase(text) {
      return text.split(' ')
        .map((word) => word.charAt(0).toUpperCase()+word.slice(1).toLowerCase())
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
