$(document).ready(function() {
  // $('ul.tabs').tabs()
  // $('ul.tabs').tabs('select_tab', 'tebakgender')
  // $(".button-collapse").sideNav()
  // $('.carousel.carousel-slider').carousel({fullWidth: true})
  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 100,
  })
})

let sanitize = function(name) {
  return name.replace(/[^A-Za-z']/g, ' ')
    .replace(/ +/g, ' ')
    .trim()
    .replace(/ /g, '-')
}
