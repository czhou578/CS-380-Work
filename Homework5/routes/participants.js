const express = require('express')
const database = require('../database')

const router = express.Router()

router.get('/get-participants', (req, res) => {
  let sql = `SELECT * FROM `
})

module.exports = router