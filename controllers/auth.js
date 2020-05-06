const db = require('../db')

module.exports.showLoginForm = (req, res) => {
  res.render('auth/login')
}

module.exports.login = (req, res) => {
  let email = req.body.email || ''
  let password = req.body.password || ''

  let user = db.get('users').find({email: email}).value()
  
  if (!user) {
    res.render('auth/login', {
      errors: ['User does not exist!']
    })
  }

  if (user.password !== password) {
    res.render('auth/login', {
      errors: ['User or password is not correct']
    })
  }

  res.cookie('userId', user.id, { signed: true })
  res.redirect('/')
}