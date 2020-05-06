const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

router.get('/', userController.index)
router.get('/create', userController.create)
router.post('/create', userController.store)
router.get('/:id', userController.detail)

module.exports = router