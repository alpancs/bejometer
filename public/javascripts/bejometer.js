Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: 'pink',
  accent: 'purple',
  warn: 'deep-orange',
  background: 'white',
})

new Vue({
  el: '#app',
  methods: {
    save(name1, date1, name2, date2) {
      localStorage.bejometerName1 = name1
      localStorage.bejometerDate1 = date1
      localStorage.bejometerName2 = name2
      localStorage.bejometerDate2 = date2
      location.href = '/'
    },
  },
})
