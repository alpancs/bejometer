new Vue({
  el: '#tebakgender',
  data: {
    name: localStorage.tebakgenderName || '',
    result: null,
    error: null,
    inputErrors: [],
    requesting: false,
  },

  methods: {
    validate: function() {
      let errors = []
      if (sanitize(this.name).length === 0) errors.push('Nama tolong diisi dengan benar gan..')
      return errors
    },

    saveToLocal: function() {
      localStorage.tebakgenderName = this.name
    },

    buildParam: function() {
      return sanitize(this.name)
    },

    buildShareURL: function() {
      return `${location.origin}/tebakgender/${this.buildParam()}`
    },

    updateResult: function() {
      this.saveToLocal()
      this.inputErrors = this.validate()
      if (this.inputErrors.length) return

      this.requesting = true
      this.result = null
      this.error = null
      axios.get(`/api/tebakgender/${this.buildParam()}`)
        .then((response) => this.result = response.data,
          (error) => this.error = error)
        .then(() => this.requesting = false)
    },
  },
})
