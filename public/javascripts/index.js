sanitize = function(name) {
  return name.replace(/'/g, '')
    .replace(/[^A-Za-z]/g, ' ')
    .replace(/ +/g, ' ')
    .trim()
    .replace(/ /g, '-')
}
