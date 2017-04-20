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
    stream: new EventSource('/pawon/stream'),
    logs: [],
  },
})

app.stream.onmessage = (ev) => app.logs.push(JSON.parse(ev.data))
