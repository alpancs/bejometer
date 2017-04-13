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
    logs: [],
  },
})

app.es.onmessage = (ev) => app.logs.unshift(JSON.parse(ev.data))
