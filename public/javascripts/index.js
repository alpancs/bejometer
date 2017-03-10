let sanitize = function(name) {
  return name.replace(/[^A-Za-z]/g, ' ')
    .replace(/ +/g, ' ')
    .trim()
    .replace(/ /g, '-')
}
