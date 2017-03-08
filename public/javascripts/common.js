new Vue({
  el: '#bejometer',
  data: {
    baseURL: location.origin,
    name1: '',
    date1: '',
    name2: '',
    date2: '',
    ready: true,
    result: undefined,
    error: undefined,
    inputErrors: [],
    updated: false,
    requesting: false,
  },

  methods: {
    sanitize: function(name) {
      return name.replace(/'/g, '')
        .replace(/[^A-Za-z]/g, ' ')
        .replace(/ +/g, ' ')
        .trim()
        .replace(/ /g, '-')
    },

    validate: function() {
      this.inputErrors = []
      if (this.name1.length === 0) this.inputErrors.push('Nama 1 tolong diisi gan..')
      if (this.date1.length === 0) this.inputErrors.push('Tanggal lahir 1 tolong diisi gan..')
      if (this.name2.length === 0) this.inputErrors.push('Nama 2 tolong diisi gan..')
      if (this.date2.length === 0) this.inputErrors.push('Tanggal lahir 2 tolong diisi gan..')
      return this.inputErrors.length === 0
    },

    updateResult: function() {
      this.updated = true
      let name1 = this.sanitize(this.name1)
      let date1 = this.date1
      let name2 = this.sanitize(this.name2)
      let date2 = this.date2
      if (this.validate()) {
        this.requesting = true
        let param = `${name1}:${date1}&${name2}:${date2}`
        axios.get(`/api/bejometer/${param}`)
          .then((response) => this.result = response.data)
          .catch((error) => this.error = error)
          .then(() => this.requesting = false)
      }
    },
  },
})
