Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: 'pink',
  accent: 'purple',
  warn: 'deep-orange',
  background: 'white',
})

new Vue({
  el: '#app',
})
