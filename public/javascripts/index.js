Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: 'pink',
  accent: 'white',
  warn: 'deep-orange',
  background: 'white',
})

new Vue({
  el: '#app',

  data: {
    input:
      localStorage.input ?
      JSON.parse(localStorage.input) :
      {bejometer: {}, consultation: {}, tebakgender: {}},

    requestingBejometer: false,
    resultBejometer: false,
    errorBejometer: false,
    shareURLBejometer: false,
  },

  methods: {
    submitBejometer() {
      this.requestingBejometer = true
      this.openDialog('bejometerResult')

      this.resultBejometer = null
      this.shareURLBejometer = null
      this.errorBejometer = null

      let params = {
        name1: this.input.bejometer.name1,
        date1: this.input.bejometer.date1,
        name2: this.input.bejometer.name2,
        date2: this.input.bejometer.date2,
      }
      axios.get('/api/bejometer', {params})
        .then((response) => {
          this.resultBejometer = response.data
          this.shareURLBejometer = this.buildShareURLBejometer()
        })
        .catch((error) => this.errorBejometer = error)
        .then(() => this.requestingBejometer = false)

      localStorage.input = JSON.stringify(this.input)
    },

    buildShareURLBejometer() {
      let name1 = this.sanitize(this.input.bejometer.name1 || '')
      let date1 = this.input.bejometer.date1 || ''
      let name2 = this.sanitize(this.input.bejometer.name2 || '')
      let date2 = this.input.bejometer.date2 || ''
      return `${location.origin}/bejometer/${name1}:${date1}&${name2}:${date2}`
    },

    sanitize(name) {
      return name.replace(/[^A-Za-z']/g, ' ')
        .replace(/ +/g, ' ')
        .trim()
        .replace(/ /g, '-')
    },

    openDialog(ref) {
      this.$refs[ref].open()
    },

    closeDialog(ref) {
      this.$refs[ref].close()
    },
  },
})
