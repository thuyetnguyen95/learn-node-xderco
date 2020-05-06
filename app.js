require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

const authMiddleware = require('./middlewares/auth.middleware')

const appRoute = require('./routes/index')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser(process.env.APP_SECRET))

// Router
app.use('/', appRoute)
app.use('/users', authMiddleware.auth, userRoute)
app.use('/auth', authRoute)


app.listen(4000, () => {
  console.log('Server running on: http://localhost:4000')
})