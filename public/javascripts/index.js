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
    bejometerShareURL: '',

    consultationRequesting: false,
    consultationResult: null,

    tebakgenderRequesting: false,
    tebakgenderResult: null,
  },

  methods: {
    bejometerSubmit() {
      this.$refs.bejometerResult.open()
      this.bejometerRequesting = true
      this.bejometerResult = null
      this.bejometerShareURL = ''

      let params = {
        name1: this.bejometerName1,
        date1: this.bejometerDate1 || new Date().toISOString().slice(0, 10),
        name2: this.bejometerName2,
        date2: this.bejometerDate2 || new Date().toISOString().slice(0, 10),
      }
      axios.get('/api/bejometer', {params})
      .then((response) => {
        let genderConfidence1 = response.data.person1.genderConfidence
        let genderConfidence2 = response.data.person2.genderConfidence
        if (this.human(genderConfidence1) && this.human(genderConfidence2)) {
          this.bejometerResult = response.data
          let match = Math.round(this.bejometerResult.match * 10000) / 10000
          this.bejometerResult.match = 0
          setTimeout(() => {
            let duration = 1000
            let repeat = 33
            let increment = match/repeat
            let interval = setInterval(() => {
              this.bejometerResult.match += increment
              if (--repeat === 0) {
                this.bejometerResult.match = match
                clearInterval(interval)
              }
            }, duration/repeat)
          }, 500)
        } else {
          this.$refs.bejometerResult.close()
          setTimeout(() => this.bejometerResult = response.data, 500)
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
      this.$refs.consultationResult.open()
      this.consultationRequesting = true
      this.consultationResult = null

      let params = {
        name: this.consultationName,
        date: this.consultationDate || new Date().toISOString().slice(0, 10),
      }
      axios.get('/api/consultation', {params})
      .then((response) => {
        if (this.human(response.data.person.genderConfidence)) {
          this.consultationResult = response.data
        } else {
          this.$refs.consultationResult.close()
          setTimeout(() => this.consultationResult = response.data, 500)
        }
      })
      .catch((e) => this.$refs.error.open())
      .then(() => this.consultationRequesting = false)

      localStorage.consultationName = this.consultationName
      localStorage.consultationDate = this.consultationDate
    },

    tebakgenderSubmit() {
      this.$refs.tebakgenderResult.open()
      this.tebakgenderRequesting = true
      this.tebakgenderResult = null

      let params = {name: this.tebakgenderName}
      axios.get('/api/tebakgender', {params})
      .then((response) => this.tebakgenderResult = response.data)
      .catch(() => this.$refs.error.open())
      .then(() => this.tebakgenderRequesting = false)

      localStorage.tebakgenderName = this.tebakgenderName
    },

    bejometerBuildShareURL(name1, date1, name2, date2) {
      name1 = this.sanitize(name1 || '').toLowerCase()
      date1 = date1 || this.timeToTextField(Date.now())
      name2 = this.sanitize(name2 || '').toLowerCase()
      date2 = date2 || this.timeToTextField(Date.now())
      return `${location.origin}/bejometer/${name1}:${date1}&${name2}:${date2}`
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

    textFieldToHuman(dateString) {
      let date = new Date(dateString)
      return `${date.getDate()} ${bulan[date.getMonth()]} ${date.getFullYear()}`
    },

    timeToTextField(time) {
      let date = new Date(time)
      return `${date.getFullYear()}-${this.twoDigits(date.getMonth()+1)}-${this.twoDigits(date.getDate())}`
    },
    twoDigits(number) {
      return number < 10 ? '0' + number : number.toString()
    },
  },
})

new Vue({el: '#loading'})

const bulan = 'Januari Februari Maret April Mei Juni Juli Agustus September Oktober November Desember'.split(' ')
