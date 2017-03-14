$(document).ready(function() {
  if (localStorage.lastTab)
    $('ul.tabs').tabs('select_tab', localStorage.lastTab)
  else
    $('ul.tabs').tabs()

  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 200,
    format: 'yyyy-mm-dd',
  })

})

let sanitize = function(name) {
  return name.replace(/[^A-Za-z']/g, ' ')
    .replace(/ +/g, ' ')
    .trim()
    .replace(/ /g, '-')
}
