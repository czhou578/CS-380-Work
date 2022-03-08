const express = require('express')
const database = require('../database')

const router = express.Router()

router.get('/get-participants', (req, res) => {
  let sql = `SELECT * FROM participants`
  database.query(sql, function (error, result) {
    if (error) throw error

    res.send(result)
  })
})

router.post('/add-participant', (req, res) => {
  const { groupId, userId } = req.body

  if (groupId && userId) {
    let sql = `INSERT INTO participants (group_id, participant_id) VALUES (${groupId}, ${userId})`
    database.query(sql, function (error, result) {
      if (error) throw error
  
      res.send('participant added')
    })
  } else {
    res.send('invalid parameters, try again.')
  }
})

router.delete('/delete-participant', (req, res) => {
  const { groupId, userId } = req.body

  if (groupId && userId) {
    let sql = `DELETE FROM participants WHERE group_id = ${groupId} AND participant_id = ${userId}`
    database.query(sql, function (error, result) {
      if (error) throw error

      res.send('participant deleted')
    })
  } else {
    res.send('deletion failed, try again')
  }
})



module.exports = router