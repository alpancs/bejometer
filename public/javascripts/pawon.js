Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: 'pink',
  accent: 'purple',
  warn: 'deep-orange',
  background: 'white',
})

let app = new Vue({
  el: '#app',
  data: {
    es: new EventSource('/pawon/stream'),
    calculations: [],
    requests: [],
  },
})

app.es.onmessage = (ev) => {
  let data = JSON.parse(ev.data)
  data.message === 'request' ?
    app.requests.unshift(data) :
    app.calculations.unshift(data)
}
