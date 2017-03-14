module.exports = (req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    if(req.method === 'GET') {
      res.redirect(`https://${req.hostname}${req.url}`)
    } else {
      res.status = 400
      res.send('use https')
    }
  } else {
    next()
  }
}
