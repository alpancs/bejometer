new Vue({
  el: '#bejometer',
  data: {
    name1: localStorage.name1 || '',
    date1: localStorage.date1 || '',
    name2: localStorage.name2 || '',
    date2: localStorage.date2 || '',
    result: null,
    error: null,
    inputErrors: [],
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
      let errors = []
      if (this.name1.length === 0) errors.push('Nama 1 tolong diisi gan..')
      if (this.date1.length === 0) errors.push('Tanggal lahir 1 tolong diisi gan..')
      if (this.name2.length === 0) errors.push('Nama 2 tolong diisi gan..')
      if (this.date2.length === 0) errors.push('Tanggal lahir 2 tolong diisi gan..')
      return errors
    },

    saveToLocal: function() {
      localStorage.name1 = this.name1
      localStorage.date1 = this.date1
      localStorage.name2 = this.name2
      localStorage.date2 = this.date2
    },

    buildParam: function() {
      let name1 = this.sanitize(this.name1)
      let date1 = this.date1
      let name2 = this.sanitize(this.name2)
      let date2 = this.date2
      return `${name1}:${date1}&${name2}:${date2}`
    },

    buildShareURL: function() {
      return `${location.origin}/bejometer/${this.buildParam()}`
    },

    updateResult: function() {
      this.saveToLocal()
      this.inputErrors = this.validate()
      if (this.inputErrors.length) return

      this.requesting = true
      this.result = null
      this.error = null
      axios.get(`/api/bejometer/${this.buildParam()}`)
        .then((response) => this.result = response.data,
          (error) => this.error = error)
        .then(() => this.requesting = false)
    },
  },
})
