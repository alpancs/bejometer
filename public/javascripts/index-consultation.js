new Vue({
  el: '#consultation',
  data: {
    name: localStorage.consultationName || '',
    date: localStorage.consultationDate || '',
    result: null,
    error: null,
    inputErrors: [],
    requesting: false,
  },

  methods: {
    validate: function() {
      let errors = []
      if (sanitize(this.name).length === 0) errors.push('Nama tolong diisi dengan benar gan..')
      if (this.date.length === 0) errors.push('Tanggal lahir tolong diisi dengan benar gan..')
      return errors
    },

    saveToLocal: function() {
      localStorage.consultationName = this.name
      localStorage.consultationDate = this.date
    },

    buildParam: function() {
      let name = sanitize(this.name)
      let date = this.date
      return `${name}:${date}`
    },

    buildShareURL: function() {
      return `${location.origin}/consultation/${this.buildParam()}`
    },

    updateResult: function() {
      this.saveToLocal()
      this.inputErrors = this.validate()
      if (this.inputErrors.length) return

      this.requesting = true
      this.result = null
      this.error = null
      axios.get(`/api/consultation/${this.buildParam()}`)
        .then((response) => this.result = response.data,
          (error) => this.error = error)
        .then(() => this.requesting = false)
    },
  },
})
