new Vue({
  el: '#tebakgender',
  data: {
    name: localStorage.tebakgenderName || '',
    shareURL: '',
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

    updateResult: function() {
      this.saveToLocal()
      this.inputErrors = this.validate()
      if (this.inputErrors.length) return

      this.requesting = true
      this.result = null
      this.error = null
      this.shareURL = ''

      $.get(`/api/tebakgender/${this.buildParam()}`)
        .done((response) => {
          this.result = response
          this.shareURL = `${location.origin}/tebakgender/${this.buildParam()}`
        })
        .fail((error) => this.error = error)
        .always(() => this.requesting = false)
    },
  },
})
