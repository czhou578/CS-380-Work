// require() is like Java or Python's import or C++'s #include
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// express() comes from a library; creates a server object for us
const app = express()

// the use() method lets us register functions that
// can read and modify request and response objects
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// registers an anonymous function to be called whenever the
// server receives "POST /formsubmit" in the first HTTP line
app.post('/formsubmit', (request, response) => {
    console.log('Request body: ', request.body)
    response.redirect('/')
})

// Unlike other languages, JS does automatically expose objects,
// classes, functions, etc. We have to export manually so other
// JS files can then import our app.
module.exports = app
