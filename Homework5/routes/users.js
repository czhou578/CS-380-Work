const express = require('express')
const database = require('../database')

const router = express.Router()

router.post('/add-users', (req, res) => {
  const {id, name, joinedAt, active, interests } = req.body

  if (id && name && joinedAt && active && interests) {
    let createInterest = `INSERT INTO interests(user_id, interests) VALUES (${id}, '${interests}')`
    let sql = `INSERT INTO user (user_id, user_name, joined_at, user_active) VALUES (${id}, '${name}', '${joinedAt}', ${active}); ${createInterest}`
    database.query(sql, function(error, result) {
      if (error) throw error
  
      res.send('user created')
    })
  } else {
    res.send('invalid parameters')
  }


})

router.get('/get-user-info', (req, res) => {
  const { id } = req.body

  if (id) {
    let sql = `SELECT *, IF (user_active, 'true', 'false') user_active FROM user WHERE user_id = ${id}`
    database.query(sql, function (error, result) {
      if (error) throw error
  
      res.send(result)
    })
  } else {
    res.send('Undefined ID')
  }
})

router.put('/update-user-interest', (req, res) => {
  const {id, interest} = req.body

  if (id && interest) {
    let sql = `UPDATE interests SET interests = ? WHERE user_id = ?`
    database.query(sql, [interest, id], function (error, result) {
      if (error) throw error

      res.send('interests updated')
    })
  } else {
    res.send('interests update failed')
  }
})

router.put('/update-active-status', (req, res) => {
  const { id, active } = req.body

  if (id && active) {
    let sql = `UPDATE user SET user_active = ? WHERE user_id = ?`
    database.query(sql, [active, id], function (error, result) {
      if (error) throw error

      res.send('active status updated')
    })
  } else {
    res.send('active status update failed')
  }
})

module.exports = router