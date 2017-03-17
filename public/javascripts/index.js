Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: 'pink',
  accent: 'white',
  warn: 'deep-orange',
  background: 'white',
})

new Vue({
  el: '#index',

  data: {
    input: localStorage.input ? JSON.parse(localStorage.input) : {
      bejometer: {},
      consultation: {},
      tebakgender: {},
    },
    requesting: {},
    result: {},
    error: {},
    shareURL: {},
  },

  methods: {
    submit(app) {
      this.requesting[app] = true
      this.openDialog(`${app}Result`)

      this.result[app] = null
      this.shareURL[app] = ''
      this.error[app] = null

      let params = this.buildParam(app)
      axios.get(`/api/${app}`, {params})
        .then((response) => {
          this.result[app] = response.data
          this.shareURL[app] = this.buildShareURL(app)
          console.log(this.result[app]);
        })
        .catch((error) => this.error[app] = error)
        .then(() => this.requesting[app] = false)

      localStorage.input = JSON.stringify(this.input)
    },

    buildParam(app) {
      if (app === 'bejometer')
        return {
          name1: this.input.bejometer.name1,
          date1: this.input.bejometer.date1,
          name2: this.input.bejometer.name2,
          date2: this.input.bejometer.date2,
        }
    },

    buildShareURL(app) {
      if (app === 'bejometer') {
        let name1 = this.sanitize(this.input.bejometer.name1 || '')
        let date1 = this.input.bejometer.date1
        let name2 = this.sanitize(this.input.bejometer.name2 || '')
        let date2 = this.input.bejometer.date2
        return `${location.origin}/bejometer/${name1}:${date1}&${name2}:${date2}`
      }
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
