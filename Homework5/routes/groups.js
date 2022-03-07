const express = require('express')
const database = require('../database')

const router = express.Router()

router.get('/list-groups', (req, res) => {
  let sql = `SELECT * FROM user_groups`
  database.query(sql, function (error, result) {
    if (error) throw error

    res.send(result)
  })
})

router.get('/get-group', (req, res) => {
  const { id } = req.body

  if (id) {
    let sql = `SELECT * FROM user_groups WHERE id = ${id}`
    database.query(sql, function (error, result) {
      if (error) throw error
  
      res.send(result)
    })
  } else {
    res.send('unable to retrieve group, try again')
  }
})

router.post('/new-group', (req, res) => {
  const { creatorId, groupId, groupName } = req.body
  
  if (creatorId && groupId && groupName) {
    let sql = `INSERT INTO user_groups (id, name) VALUES (${groupId}, '${groupName}')`
    database.query(sql, function (error, result) {
      if (error) throw error

      res.send('group created')
    })
  } else {
    res.send('invalid parameters')
  }
})

module.exports = router