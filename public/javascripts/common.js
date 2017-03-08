new Vue({
  el: '#bejometer',
  data: {
    baseURL: location.origin,
    name1: 'Alfan',
    date1: '1994-07-28',
    name2: 'Ayu',
    date2: '1996-12-08',
    bejometerResult: undefined,
  },
  methods: {
    updateBejometer: function() {
      let name1 = this.name1
      let date1 = this.date1
      let name2 = this.name2
      let date2 = this.date2
      axios.get(`/api/bejometer/${name1}:${date1}&${name2}:${date2}`)
        .then((response) => this.bejometerResult = response.data)
        .catch((_error) => this.bejometerResult = null)
    },
  },
})
