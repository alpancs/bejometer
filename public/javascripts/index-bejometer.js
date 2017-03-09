new Vue({
  el: '#bejometer',
  data: {
    name1: localStorage.bejometerName1 || '',
    date1: localStorage.bejometerDate1 || '',
    name2: localStorage.bejometerName2 || '',
    date2: localStorage.bejometerDate2 || '',
    shareURL: '',
    result: null,
    error: null,
    inputErrors: [],
    requesting: false,
  },

  methods: {
    validate: function() {
      let errors = []
      if (sanitize(this.name1).length === 0) errors.push('Nama 1 tolong diisi dengan benar gan..')
      if (this.date1.length === 0) errors.push('Tanggal lahir 1 tolong diisi dengan benar gan..')
      if (sanitize(this.name2).length === 0) errors.push('Nama 2 tolong diisi dengan benar gan..')
      if (this.date2.length === 0) errors.push('Tanggal lahir 2 tolong diisi dengan benar gan..')
      return errors
    },

    saveToLocal: function() {
      localStorage.bejometerName1 = this.name1
      localStorage.bejometerDate1 = this.date1
      localStorage.bejometerName2 = this.name2
      localStorage.bejometerDate2 = this.date2
    },

    buildParam: function() {
      let name1 = sanitize(this.name1)
      let date1 = this.date1
      let name2 = sanitize(this.name2)
      let date2 = this.date2
      return `${name1}:${date1}&${name2}:${date2}`
    },

    updateResult: function() {
      this.inputErrors = this.validate()
      if (this.inputErrors.length) return

      this.saveToLocal()
      this.requesting = true
      this.result = null
      this.error = null
      this.shareURL = ''

      axios.get(`/api/bejometer/${this.buildParam()}`)
        .then((response) => {
          this.result = response.data
          this.shareURL = `${location.origin}/bejometer/${this.buildParam()}`
        })
        .catch((error) => this.error = error)
        .then(() => this.requesting = false)
    },
  },
})
