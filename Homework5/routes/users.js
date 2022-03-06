const express = require('express')
const database = require('../database')

const router = express.Router()

router.post('/postNewUsers', (req, res) => {
  res.send('hello')
})

module.exports(router)