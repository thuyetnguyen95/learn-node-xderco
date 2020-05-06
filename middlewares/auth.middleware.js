const db = require('../db')

module.exports.auth = (req, res, next) => {
  let userId = req.signedCookies.userId || ''

  if (!userId) {
    return res.redirect('/auth/login')
  }

  let user = db.get('users').find({id: parseInt(userId)}).value()
  if (!user) {
    return res.redirect('/auth/login')
  }

  res.locals.user = user

  return next()
}