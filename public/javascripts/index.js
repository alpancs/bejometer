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
      this.bejometerResult = null
      this.bejometerShareURL = null

      let params = {
        name1: this.bejometerName1,
        date1: this.bejometerDate1,
        name2: this.bejometerName2,
        date2: this.bejometerDate2,
      }
      axios.get('/api/bejometer', {params})
      .then((response) => {
        this.bejometerResult = response.data
        if (human(this.bejometerResult.person1.genderConfidence) &&
            human(this.bejometerResult.person2.genderConfidence))
          this.openDialog('bejometerResult')
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
      this.consultationShareURL = null
      this.consultationError = null

      let params = {
        name: this.consultationName,
        date: this.consultationDate,
      }
      axios.get('/api/consultation', {params})
      .then((response) => {
        this.consultationResult = response.data
        this.openDialog('consultationResult')
        this.consultationShareURL = this.consultationBuildShareURL()
      })
      .catch((error) => this.consultationError = error)
      .then(() => this.consultationRequesting = false)

      localStorage.consultationName = this.consultationName
      localStorage.consultationDate = this.consultationDate
    },

    tebakgenderSubmit() {
      this.tebakgenderRequesting = true
      this.tebakgenderResult = null
      this.tebakgenderShareURL = null
      this.tebakgenderError = null

      let params = {name: this.tebakgenderName}
      axios.get('/api/tebakgender', {params})
      .then((response) => {
        this.tebakgenderResult = response.data
        this.openDialog('tebakgenderResult')
        this.tebakgenderShareURL = this.tebakgenderBuildShareURL()
      })
      .catch((error) => this.tebakgenderError = error)
      .then(() => this.tebakgenderRequesting = false)

      localStorage.tebakgenderName = this.tebakgenderName
    },

    openDialog(ref) {
      this.$refs[ref].open()
    },

    closeDialog(ref) {
      this.$refs[ref].close()
    },
  },
})

let sanitize = (name) => name.replace(/[^A-Za-z']/g, ' ').replace(/ +/g, ' ').trim().replace(/ /g, '-')
let toTitleCase = (text) => text.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase()+word.slice(1)).join(' ')
let toPercent = (value) => Math.round(value * 10000) / 100 + '%'
let human = (confidence) => confidence > 0.33

let bejometerBuildShareURL = (name1, date1, name2, date2) => {
  name1 = sanitize(name1 || '').toLowerCase()
  date1 = date1 || ''
  name2 = sanitize(name2 || '').toLowerCase()
  date2 = date2 || ''
  return `${location.origin}/bejometer/${name1}:${date1}&${name2}:${date2}`
}

let consultationBuildShareURL = (name, date) => {
  name = sanitize(name || '').toLowerCase()
  date = date || ''
  return `${location.origin}/consultation/${name}:${date}`
}

let tebakgenderBuildShareURL = (name) => {
  name = sanitize(name || '').toLowerCase()
  return `${location.origin}/tebakgender/${name}`
}

sanitize
toTitleCase
toPercent
human
bejometerBuildShareURL
consultationBuildShareURL
tebakgenderBuildShareURL
