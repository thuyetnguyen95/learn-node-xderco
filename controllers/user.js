const db = require('../db')

module.exports.index = (req, res) => {
  let users = db.get('users').value()
  res.render('users/index', {users: users })
}

module.exports.create = (req, res) => {
  res.render('users/create')
}

module.exports.store = (req, res) => {
  let name = req.body.name || ''
  let phoneNumber = req.body.phone_number || ''

  let errors = []
  if (!name) {
    errors.push('Name is required!')
  }

  if (!phoneNumber) {
    errors.push('Phone number is required!')
  }

  if (errors.length) {
    return res.render('users/create', { errors, values: req.body})
  }


  if (name) {
    db.get('users')
    .push({ id: new Date().getTime(), name, phoneNumber})
    .write()
  }

  res.redirect('/')
}

module.exports.detail = (req, res) => {
  let id = req.params.id || 0
  let user = db.get('users').find({id: parseInt(id)}).value()

  if (user) {
    res.render('users/detail', {user})
  } else {
    res.send('Not found => <a href="/">Back</a>')
  }
}
