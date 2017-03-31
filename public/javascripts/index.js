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
        if (this.human(this.bejometerResult.person1.genderConfidence) &&
            this.human(this.bejometerResult.person2.genderConfidence))
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

      let params = {
        name: this.consultationName,
        date: this.consultationDate,
      }
      axios.get('/api/consultation', {params})
      .then((response) => {
        this.consultationResult = response.data
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
        this.openDialog('tebakgenderResult')
      })
      .catch(() => this.$refs.error.open())
      .then(() => this.tebakgenderRequesting = false)

      localStorage.tebakgenderName = this.tebakgenderName
    },

    bejometerBuildShareURL(name1, date1, name2, date2) {
      name1 = sanitize(name1 || '').toLowerCase()
      date1 = date1 || ''
      name2 = sanitize(name2 || '').toLowerCase()
      date2 = date2 || ''
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
let consultationBuildShareURL = (name, date) => {
  name = sanitize(name || '').toLowerCase()
  date = date || ''
  return `${location.origin}/consultation/${name}:${date}`
}

let tebakgenderBuildShareURL = (name) => {
  name = sanitize(name || '').toLowerCase()
  return `${location.origin}/tebakgender/${name}`
}
*/
