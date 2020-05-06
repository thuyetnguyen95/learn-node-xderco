const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req, res) => {
  let products = db.get('products').value()
  res.render('index', {products})
})

module.exports = router;