new Vue({
  el: '#consultation',
  data: {
    name: localStorage.consultationName || '',
    date: localStorage.consultationDate || '',
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

    updateResult: function() {
      this.date = $('#dateConsultation').val()
      this.inputErrors = this.validate()
      if (this.inputErrors.length) return

      this.saveToLocal()
      this.requesting = true
      this.result = null
      this.error = null
      this.shareURL = ''

      $.get(`/api/consultation/${this.buildParam()}`)
        .done((response) => {
          this.result = response
          this.shareURL = `${location.origin}/consultation/${this.buildParam()}`
        })
        .fail((error) => this.error = error)
        .always(() => this.requesting = false)
    },
  },
})
